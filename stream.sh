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