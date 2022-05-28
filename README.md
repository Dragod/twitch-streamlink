# twitch-stream-link

> Dependencies: [Streamlink](https://pypi.org/project/streamlink/) - [VLC](https://www.videolan.org/vlc/) and/or [Mpv](https://mpv.io/)

![image](https://db3pap002files.storage.live.com/y4m_7HT5DZVcOtjDDME5--vy0jXt4453FUdNbX6l8pV6NcACcgWMFYyPYfylzc_OSoiFGBN1JxtB-fZ9DuerpGZVKAdElIx6713MXW0t4ZAjlqtbBpDjov_2eUFoYXRC1HiFP8EU7xjSpmWdUKOT2noSElkFkEPESXh5PTFBbuKjGmLuF_oO1p0X3gIv1wJPWzO?width=976&height=679&cropmode=none)

I made this tiny nodejs package because I wanted to remove twitch app from my phone and also I didn't want to use the twitch site on desktop, as I don't care about the chat.

### How to use it

```bash

# git clone this repo then npm i

# List of available streamers
node stream -a

# Start streaming Shroud if he is online
node stream -s shroud

# Start stream using npm scripts

npm run ziz

npm run shroud

# With npx

# List of available streamers
npx @pfcode/twitch-stream-link@latest -a

# Start streaming Shroud if he is online
npx @pfcode/twitch-stream-link@latest -s shroud
```

### Create a shortcut

```bash
# Add this code to your .bashrc

# Stream

function stream()
{
    if [ "$1" ]; then

    eval "npx @pfcode/twitch-stream-link@latest -s $1"

    else

    echo -e -ne $(alert 'The streamer name given do not exist in config.json. Exit the script...')

    exit

    fi
}

alias stream=stream

# Reload your terminal then use
stream zizaran
```

### One click stream

You can create a ```.bat``` file to run a streamer with one click

Create a ```xqc.bat``` for example in your desktop then add this snippet

```bat
@echo off
npx @pfcode/twitch-stream-link@latest -s xqc
```

Xqc stream will run in one click if he is online :)

### Output example

```bash
$ stream zizaran
npx: installed 3 in 3.856s
[cli][info] Found matching plugin twitch for URL twitch.tv/zizaran
[cli][info] Available streams: audio_only, 160p (worst), 360p, 480p, 720p, 720p60, 1080p60 (best)
[cli][info] Opening stream: 1080p60 (hls)
[cli][info] Starting player: "C:\Program Files\VideoLAN\VLC\vlc.exe"
[cli][info] Player closed
[cli][info] Stream ended
[cli][info] Closing currently open stream...
```

![image](https://db3pap002files.storage.live.com/y4mmfUz4iazbK-wOqXNjT3gvctenmdX65Bkr9JMQR0CP2LR5mDtw-rXYvD5dtSWm6vjBH-9Obryj_9CoYdxq8-8blC3DdXb8QhHD_RCubX9J4HEVrgviU68YkhnZ-mj2HbIF2YODPtC_iTszu0eclagftiGOXzI7u3I3YpyfacIg6P147P1Wml9tFkygYUIo9CI?width=510&height=1013&cropmode=none)

![image](https://db3pap002files.storage.live.com/y4mTKKI-Kks8trisss0JSBUGc5LLBLH18cI-cCfdR6XTSX_utp1a2X2ZQGgVsrIbYqxC0GAY_G2B9UhmMFvwoEaevnuBDtyGQVvyJpTWQ09t8XdB2gKH9TviWAYl8pcon0pLngjfZYqQWC86xM5eSWZNx0UAPOwVBZipMXnAtbzXkWKlVUbgS6idvce1754Yb0T?width=517&height=1009&cropmode=none)

---

You can watch your favourite streamer as long as you have [streamlink](https://streamlink.github.io/) and [VLC](https://www.videolan.org/vlc/) or [MPV](https://mpv.io/) (or both) player installed in your machine.

---

# Mobile

This work on mobile using termux with: [x11-packages](https://github.com/termux/x11-packages)

### How to install VLC and MPV on mobile

- VLC is in the store foxy droid/ droid or play store.
- MPV fdroid/ foxy droid or just run:

```pkg install mpv```

Also read this reddit guide to open video streams on android device:
[https://www.reddit.com/r/Streamlink/comments/cfno18/guide_streamlink_on_android_termux_vlc/](https://www.reddit.com/r/Streamlink/comments/cfno18/guide_streamlink_on_android_termux_vlc/)

Clone or fork this repo to get your own version of streamer list.

All you need to do is update the ```config.json```, jsut add/remove streamers:

```json

{
    "streamer":
    [
        {
            "name": "xqc",
            "options":
            {
                "platform": "twitch",
                "url": "twitch.tv/",
                "title": "Twitch---xQc---",
                "quality": "best"
            }

        }
    ]
}

```

Then you need to publish your own package for it work with Npx.

[https://bugfender.com/blog/how-to-create-an-npm-package/](https://bugfender.com/blog/how-to-create-an-npm-package/)
