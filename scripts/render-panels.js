#!/usr/bin/env node

/**
 * Twitch Panel Renderer
 * Renders all Twitch panels to PNG files using Puppeteer
 *
 * Usage: npm run render-panels
 */

const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../static/images/panels');
const HUGO_PORT = 1314; // Use different port to avoid conflicts
const PANELS_URL = `http://localhost:${HUGO_PORT}/twitch-panels/`;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function startHugo() {
  return new Promise((resolve, reject) => {
    console.log('Starting Hugo server...');

    const hugo = spawn('hugo', ['server', '-p', HUGO_PORT.toString(), '--disableLiveReload'], {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let started = false;

    hugo.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Web Server is available') && !started) {
        started = true;
        console.log('Hugo server ready!');
        resolve(hugo);
      }
    });

    hugo.stderr.on('data', (data) => {
      // Hugo outputs to stderr normally, check for ready message there too
      const output = data.toString();
      if (output.includes('Web Server is available') && !started) {
        started = true;
        console.log('Hugo server ready!');
        resolve(hugo);
      }
    });

    hugo.on('error', (err) => {
      reject(new Error(`Failed to start Hugo: ${err.message}`));
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!started) {
        hugo.kill();
        reject(new Error('Hugo server failed to start within 30 seconds'));
      }
    }, 30000);
  });
}

async function renderPanels() {
  let hugo;
  let browser;

  try {
    // Start Hugo server
    hugo = await startHugo();

    // Give it a moment to fully initialize
    await new Promise(r => setTimeout(r, 1000));

    // Launch browser
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    // Navigate to panels page
    console.log(`Navigating to ${PANELS_URL}...`);
    await page.goto(PANELS_URL, { waitUntil: 'networkidle0' });

    // Wait for panels to render
    await page.waitForSelector('.panel', { timeout: 10000 });

    // Get all info panels
    const infoPanels = await page.$$('.panel');
    console.log(`Found ${infoPanels.length} info panels`);

    // Screenshot each info panel
    for (let i = 0; i < infoPanels.length; i++) {
      const panel = infoPanels[i];

      // Get the filename from the label above the panel
      const filename = await page.evaluate((el) => {
        const container = el.closest('.flex.flex-col');
        const label = container?.querySelector('.font-mono');
        return label?.textContent?.trim() || `panel_${i}.png`;
      }, panel);

      const outputPath = path.join(OUTPUT_DIR, filename);

      await panel.screenshot({
        path: outputPath,
        omitBackground: false
      });

      console.log(`  ✓ Saved: ${filename}`);
    }

    // Get all button panels
    const buttonPanels = await page.$$('.panel-button');
    console.log(`Found ${buttonPanels.length} button panels`);

    // Screenshot each button panel
    for (let i = 0; i < buttonPanels.length; i++) {
      const panel = buttonPanels[i];

      // Get the filename from the label above the panel
      const filename = await page.evaluate((el) => {
        const container = el.closest('.flex.flex-col');
        const label = container?.querySelector('.font-mono');
        return label?.textContent?.trim() || `button_${i}.png`;
      }, panel);

      const outputPath = path.join(OUTPUT_DIR, filename);

      await panel.screenshot({
        path: outputPath,
        omitBackground: false
      });

      console.log(`  ✓ Saved: ${filename}`);
    }

    console.log(`\n✨ All panels rendered to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error rendering panels:', error.message);
    process.exit(1);
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
    }
    if (hugo) {
      hugo.kill();
      console.log('Hugo server stopped.');
    }
  }
}

// Run the renderer
renderPanels();
