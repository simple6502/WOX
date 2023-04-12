
![Logo](https://raw.githubusercontent.com/simple6502/WOX/main/mainImage.png)
# WOX v1
WOX is a customizable discord bot that uses **ChatGPT**, **BLIP**, and **Stable Diffusion**. It was created mostly with **GPT-4** to see how someone with little developing experience using APIs and discord.js could do blindly with nothing but GPT-4 for the most part.

## Features

- Text 2 Image generation using Stable Diffusion
- Image 2 Text generation using BLIP image captioning
- Image 2 Image generation using Stable Diffusion
- A queue system for both the chatbot and image generation
- A very basic command handler that is out of date
- Basic chatbot understanding of images using BLIP image captioning
- Future support for other AIs such as Pygmailion... if you have a powerful enough computer 😊
- Crashing sometimes for no damn reason!

## FAQ

#### Should I use this?

ABSOLUTELY NOT LMAO. I made this for some friends so this code is not optimized all ways to be in more than one server because of how it is, even though you can kind of see that... I kind of tried in some areas lmfao.

#### Let's say I want to use this, what do I need?

Really? You want to run this piece of shit discord bot? Ugh fine, You need AT LEAST a **8GB** VRAM GPU, **16GB** RAM, **Any prossesor that can can play Minecraft at 60fps or more**, an **OPENAI API** key, **AUTOMATIC1111's Stable Diffusion WebUI**, **SillyTavern Extras** (legit was lazy and used that to get BLIP functionaliy because I am stupid as fuck), and some sanity pills for gettings this to work for your own setup or server, but seriously there are much better bots out there with much more features than mine please why are you HERE STILL!?! 😭😭😭

#### I got an error installing/running the bot, what do I do?

Figure it the fuck out, worked on my system. **SMH**

#### If I find a bug or a feature I could add, what do I do?

Don't submit an issue or pull request, ain't doing shit with them, sorry but like this bot is too shit to even TRY to save. 💀
If you want, fork this project and fix it/add it yourself, you would be making a better bot than this bot could ever be.

#### Let's say I do create an issue or pull request, what now?

**WHY?!** Legit only creating this repository so that everyone in my friend's server can see the god awful coding that me and GPT-4 had thrown together.

#### So... You don't want me running this because it sucks, creating a pull request or issue, or anything like that. Well, what CAN I do if I still wanted to do something with this bot for whatever reason?

*sigh*... The really only thing you can do is look at how I created my bot and use it to learn how to NOT code a discord bot so shit, because I ain't even using / commands over here, just the old command handler with a prefix, because I am one LAZY developer aka one lazy person who did not want to figure it out with GPT-4 since it looked more complicated. 😭

## Running this piece of shit on your own PC/Server

Clone the project

```bash
  git clone https://github.com/simple6502/WOX
```

Go to the project directory

```bash
  cd WOX
```

Install dependencies

```bash
  npm install axios discord.js dotenv node-fetch openai
```

Create a '.env' file with the following:

`DISCORD_TOKEN`

`OPENAI_KEY`

`PREFIX`

`STABLE_DIFFUSION_URL`

`BLIP_URL`

Install AUTOMATIC1111's Stable Diffusion WebUI & SillyTavern Extras

Set up your billing for OpenAI's API since it cost 💰💰💰

Start Stable Diffusion with **--api**

Start SillyTavern Extras with **--enable-modules=caption --cpu**

Change '/commands/changemodel.js' to have whatever models you have installed to be able to be changed by users of your bot, as well as the description of the command inside of it as well.

Start the discord bot

```bash
  node index.js
```

