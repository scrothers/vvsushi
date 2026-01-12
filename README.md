# vvSushii Website

Personal website for vvSushii - a gaming and streaming content creator.

## Tech Stack

- **[Hugo](https://gohugo.io/)** - Static site generator (extended version required)
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Alpine.js](https://alpinejs.dev/)** - Lightweight JavaScript framework for interactivity

## Features

- Responsive design with mobile-first approach
- Dynamic schedule with timezone support
- Steam-powered game library using Steam CDN
- YouTube clips integration
- Custom emote system
- Live stream status indicator
- Animated cloud background effects

## Project Structure

```
sushi/
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS entry point
├── content/                   # Markdown content pages
├── data/                      # YAML data files
│   ├── emotes.yaml           # Emote definitions
│   ├── games.yaml            # Steam game library
│   ├── schedule.yaml         # Stream schedule
│   └── socials.yaml          # Social media links
├── layouts/                   # Hugo templates
│   ├── _default/             # Default layouts
│   ├── partials/             # Reusable components
│   └── shortcodes/           # Content shortcodes
├── static/
│   └── images/               # Static assets
└── hugo.toml                 # Hugo configuration
```

## Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.120.0+)
- [Node.js](https://nodejs.org/) (v18+)
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Production build
npm run build

# Or directly with Hugo
hugo --minify
```

## OBS Overlays & Widgets

The site includes browser source overlays for OBS Studio. All overlays have transparent backgrounds and are designed to layer over stream content.

### Scene Overlays

These are full-screen overlays for different stream states:

| Route | Description |
|-------|-------------|
| `/obs/starting_soon/` | "Starting Soon" screen with countdown vibe |
| `/obs/just_chatting/` | Just Chatting scene with polaroid webcam frame |
| `/obs/brb/` | "Be Right Back" screen with sleepy animations |
| `/obs/ending/` | Stream ending screen |
| `/obs/offline/` | Offline screen with night sky theme |
| `/obs/blank/` | Animated background only (clouds, stars, hearts) |

### Frame Overlay

**Route:** `/obs/frame/`

A polaroid-style frame overlay that sits on top of gameplay. The game shows through the transparent photo area.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `webcam` | `br`, `bl`, `tr`, `tl`, `none` | `none` | Webcam polaroid position |
| `ratio` | `16:9`, `3:2` | `16:9` | Webcam aspect ratio |
| `size` | `sm`, `md`, `lg` | `md` | Webcam frame size |
| `socials` | `true`, `false` | `true` | Show social buttons in bottom area |
| `rec` | `true`, `false` | `true` | Show REC indicator with timestamp |
| `emotes` | `corners`, `true`, `none` | `none` | Corner emote decorations |

**Examples:**
```
/obs/frame/                                    # Basic frame with socials
/obs/frame/?webcam=br                          # + webcam bottom-right
/obs/frame/?webcam=br&size=lg&ratio=3:2        # Large 3:2 webcam
/obs/frame/?webcam=br&socials=true&rec=true    # Full setup
/obs/frame/?socials=false&rec=false            # Minimal frame only
```

### Alert Widgets

#### New Subscriber Alert

**Route:** `/obs/alert-sub/`

Animated polaroid camera that "prints" a photo with the subscriber name.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Someone Amazing` | Subscriber username |
| `label` | any string | `New Subscriber!` | Custom label text |
| `duration` | number (seconds) | `5` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-sub/?name=CoolViewer123
/obs/alert-sub/?name=NewFan&duration=8
/obs/alert-sub/?name=Follower&label=New%20Follower!&duration=6
```

**Animation Timeline:**
- 0.2s: Camera drops in with bounce
- 0.8-1.1s: Stars pop around camera
- 1.0s: Camera shakes
- 1.2s: Flash effect
- 1.3-1.6s: Hearts float up
- 1.5s: Photo prints out
- 2.5s+: Photo floats gently
- {duration}s: Fade out (0.5s animation)

#### Raid Alert

**Route:** `/obs/alert-raid/`

Animated banner with marching emotes for incoming raids.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Someone Awesome` | Raider's username |
| `viewers` | number | `???` | Viewer count |
| `duration` | number (seconds) | `6` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-raid/?name=CoolStreamer&viewers=150
/obs/alert-raid/?name=BigRaider&viewers=500&duration=8
```

#### Bits/Cheer Alert

**Route:** `/obs/alert-bits/`

Spinning gem animation with falling coins for bit cheers.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Anonymous` | Cheerer's username |
| `amount` | number | `100` | Bits amount |
| `duration` | number (seconds) | `5` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-bits/?name=GenerousFan&amount=1000
/obs/alert-bits/?name=Supporter&amount=500&duration=6
```

#### Gifted Subs Alert

**Route:** `/obs/alert-giftsub/`

Gift box that opens with mini gifts exploding out.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Anonymous` | Gifter's username |
| `count` | number | `1` | Number of gifted subs |
| `duration` | number (seconds) | `6` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-giftsub/?name=GiftBomber&count=10
/obs/alert-giftsub/?name=GenerosuViewer&count=5&duration=8
```

#### Hype Train Alert

**Route:** `/obs/alert-hypetrain/`

Animated train with level badge and progress bar.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `level` | number | `1` | Hype train level |
| `progress` | number (0-100) | `50` | Progress to next level |
| `duration` | number (seconds) | `8` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-hypetrain/?level=3&progress=75
/obs/alert-hypetrain/?level=5&progress=100&duration=10
```

#### Channel Points Redemption Alert

**Route:** `/obs/alert-redeem/`

Orbiting points with reward card display.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Viewer` | Redeemer's username |
| `reward` | any string | `Reward` | Reward name |
| `cost` | number | (hidden) | Point cost (optional) |
| `duration` | number (seconds) | `5` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-redeem/?name=FunViewer&reward=Highlight%20My%20Message
/obs/alert-redeem/?name=Redeemer&reward=VIP%20Request&cost=5000
```

#### Shoutout Alert

**Route:** `/obs/alert-shoutout/`

Megaphone animation with spotlight effect for streamer shoutouts.

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `name` | any string | `Awesome Streamer` | Streamer being shouted out |
| `message` | any string | `Go check them out!` | Custom message |
| `duration` | number (seconds) | `6` | Time before fade out (0 = no fade) |

**Examples:**
```
/obs/alert-shoutout/?name=CoolStreamer
/obs/alert-shoutout/?name=FriendlyStreamer&message=Amazing%20content!&duration=8
```

### OBS Setup

1. Add **Browser Source** in OBS
2. Set URL to your deployed site + route (e.g., `https://yoursite.com/obs/frame/`)
3. Set dimensions to match your canvas (1920x1080 for landscape, 1080x1920 for portrait)
4. Ensure the browser source is layered above your game capture

**Layer order (bottom to top):**
```
1. Game/Screen Capture
2. OBS Overlay (Browser Source)
3. Additional elements (alerts, chat, etc.)
```

### Alert Integration with Twitch Events

#### StreamElements (Recommended)

StreamElements lets you create custom widgets that trigger on Twitch events.

1. Go to **StreamElements Dashboard** → **Streaming Tools** → **Overlays**
2. Create new overlay → Add **Custom Widget**
3. Set widget dimensions (e.g., 400x400)
4. In the **HTML** tab, paste:

```html
<script>
const BASE_URL = 'https://YOURSITE.com';

window.addEventListener('onEventReceived', function(obj) {
  const event = obj.detail.event;
  const data = obj.detail.data;

  // Handle new subscribers
  if (event === 'subscriber' || event === 'subscriber-latest') {
    const name = data.name || data.displayName;
    triggerSubAlert(name, 'New Subscriber!');
  }

  // Handle follows (optional)
  if (event === 'follower' || event === 'follower-latest') {
    const name = data.name || data.displayName;
    triggerSubAlert(name, 'New Follower!');
  }

  // Handle raids
  if (event === 'raid' || event === 'raid-latest') {
    const name = data.name || data.displayName;
    const viewers = data.viewers || data.amount;
    triggerRaidAlert(name, viewers);
  }

  // Handle bits/cheers
  if (event === 'cheer' || event === 'cheer-latest') {
    const name = data.name || data.displayName;
    const amount = data.amount;
    triggerBitsAlert(name, amount);
  }

  // Handle gifted subs
  if (event === 'communityGiftPurchase') {
    const name = data.gifterUsername || data.name;
    const count = data.amount;
    triggerGiftSubAlert(name, count);
  }

  // Handle channel point redemptions
  if (event === 'redemption' || event === 'redemption-latest') {
    const name = data.name || data.displayName;
    const reward = data.reward || data.title;
    const cost = data.cost;
    triggerRedeemAlert(name, reward, cost);
  }
});

function triggerSubAlert(name, label) {
  loadAlert('/obs/alert-sub/', { name, label, duration: 5 }, 6000);
}

function triggerRaidAlert(name, viewers) {
  loadAlert('/obs/alert-raid/', { name, viewers, duration: 6 }, 7000);
}

function triggerBitsAlert(name, amount) {
  loadAlert('/obs/alert-bits/', { name, amount, duration: 5 }, 6000);
}

function triggerGiftSubAlert(name, count) {
  loadAlert('/obs/alert-giftsub/', { name, count, duration: 6 }, 7000);
}

function triggerRedeemAlert(name, reward, cost) {
  loadAlert('/obs/alert-redeem/', { name, reward, cost, duration: 5 }, 6000);
}

function loadAlert(route, params, resetDelay) {
  const iframe = document.getElementById('alert-frame');
  const url = new URL(BASE_URL + route);
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) url.searchParams.set(key, val);
  });
  iframe.src = url.toString();
  setTimeout(() => { iframe.src = 'about:blank'; }, resetDelay);
}
</script>
<iframe id="alert-frame" src="about:blank" style="width:100%;height:100%;border:none;background:transparent;"></iframe>
```

5. Replace `YOURSITE.com` with your deployed site URL
6. Save and add the overlay to OBS via the StreamElements overlay URL

**Supported StreamElements Events:**
- `subscriber` / `subscriber-latest` - New subscriptions
- `follower` / `follower-latest` - New followers
- `cheer` / `cheer-latest` - Bit cheers
- `raid` / `raid-latest` - Incoming raids
- `communityGiftPurchase` - Gifted subscriptions
- `redemption` / `redemption-latest` - Channel point redemptions

#### Streamlabs

Streamlabs requires a different approach using their Socket API:

1. Get your **Socket API Token** from Streamlabs Dashboard → Settings → API Tokens
2. Create a custom HTML file or use a Browser Source with this code:

```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
const BASE_URL = 'https://YOURSITE.com';
const token = 'YOUR_SOCKET_TOKEN';
const socket = io('https://sockets.streamlabs.com?token=' + token, { transports: ['websocket'] });

socket.on('event', (eventData) => {
  const msg = eventData.message[0];

  if (eventData.type === 'subscription') {
    loadAlert('/obs/alert-sub/', { name: msg.name, label: 'New Subscriber!', duration: 5 }, 6000);
  }

  if (eventData.type === 'follow') {
    loadAlert('/obs/alert-sub/', { name: msg.name, label: 'New Follower!', duration: 5 }, 6000);
  }

  if (eventData.type === 'raid') {
    loadAlert('/obs/alert-raid/', { name: msg.name, viewers: msg.viewers, duration: 6 }, 7000);
  }

  if (eventData.type === 'bits') {
    loadAlert('/obs/alert-bits/', { name: msg.name, amount: msg.amount, duration: 5 }, 6000);
  }

  if (eventData.type === 'subMysteryGift') {
    loadAlert('/obs/alert-giftsub/', { name: msg.gifter, count: msg.amount, duration: 6 }, 7000);
  }
});

function loadAlert(route, params, resetDelay) {
  const iframe = document.getElementById('alert-frame');
  const url = new URL(BASE_URL + route);
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) url.searchParams.set(key, val);
  });
  iframe.src = url.toString();
  setTimeout(() => { iframe.src = 'about:blank'; }, resetDelay);
}
</script>
<iframe id="alert-frame" src="about:blank" style="width:100%;height:100%;border:none;"></iframe>
```

#### Testing Alerts

For testing without live Twitch events:

1. Add a **Browser Source** in OBS
2. Set URL to: `https://yoursite.com/obs/alert-sub/?name=TestUser&duration=5`
3. Click **Refresh** on the browser source to replay the animation
4. Or use the **Interact** button to open dev tools and manually change the URL

**StreamElements Test Events:**
- In StreamElements overlay editor, use the **Emulate** button to send test events

## Deployment

This site is deployed via GitHub Pages using GitHub Actions. Pushes to the `main` branch trigger automatic builds and deployment.

## License

This project is proprietary software. See [LICENSE.md](LICENSE.md) for details.
