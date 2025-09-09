# 🍄 Smiski Pomodoro Timer

A cute and adorable Chrome extension featuring Smiski characters to help you stay focused and productive with the Pomodoro Technique!

## ✨ Features

- **🌸 Smiski-Themed Design**: Adorable pastel colors and cute character animations
- **⏰ Pomodoro Timer**: 25-minute work sessions with 5-minute short breaks and 15-minute long breaks
- **🎯 Progress Tracking**: Visual progress ring and session statistics
- **📊 Daily Stats**: Track completed sessions and daily progress
- **🔔 Smart Notifications**: Gentle reminders when sessions complete
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **💾 Persistent Storage**: Your progress is saved between sessions

## 🚀 Installation

### Method 1: Load as Unpacked Extension (Recommended)

1. **Download or Clone** this repository to your computer
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top right
4. **Click "Load unpacked"** and select the folder containing this extension
5. **Pin the extension** to your toolbar for easy access

### Method 2: Convert Icons (Optional)

If you want to use PNG icons instead of SVG:

1. Open `convert-icons.html` in your browser
2. The page will automatically download PNG versions of the icons
3. Replace the SVG files in the `icons/` folder with the downloaded PNG files

## 🎮 How to Use

1. **Click the Smiski Timer icon** in your Chrome toolbar
2. **Choose your mode**:
   - 🍄 **Pomodoro**: 25-minute work session
   - 🌸 **Short Break**: 5-minute break
   - 🌺 **Long Break**: 15-minute break
3. **Start the timer** and watch your Smiski character cheer you on!
4. **Track your progress** with the visual ring and statistics
5. **Get notified** when your session is complete

## 🎨 Smiski Characters

The extension features different Smiski characters that change based on your activity:

- **🌸 Idle**: Relaxed and ready to help
- **💪 Working**: Focused and determined
- **😴 Paused**: Taking a little rest
- **🎉 Completed**: Celebrating your success!

## 📁 File Structure

```
pomodoro-ext/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Styling and animations
├── popup.js              # Timer logic and interactions
├── background.js         # Background service worker
├── icons/                # Extension icons
│   ├── icon16.svg        # 16x16 icon
│   ├── icon48.svg        # 48x48 icon
│   └── icon128.svg       # 128x128 icon
├── convert-icons.html    # Icon conversion tool
└── README.md            # This file
```

## 🔧 Customization

You can customize the timer by modifying the following files:

- **`popup.css`**: Change colors, fonts, and animations
- **`popup.js`**: Modify timer durations and behavior
- **`manifest.json`**: Update extension metadata

## 🎯 Pomodoro Technique

The Pomodoro Technique is a time management method that uses focused work sessions:

1. **Work for 25 minutes** on a single task
2. **Take a 5-minute break** to rest and recharge
3. **After 4 work sessions**, take a longer 15-minute break
4. **Repeat** to maintain focus and productivity

## 🐛 Troubleshooting

- **Extension not loading**: Make sure Developer Mode is enabled
- **Icons not showing**: Check that the icon files are in the correct location
- **Notifications not working**: Ensure notification permissions are granted
- **Timer not working**: Try refreshing the extension or restarting Chrome

## 🤝 Contributing

Feel free to contribute to this project! Some ideas:

- Add more Smiski character variations
- Implement custom timer durations
- Add sound effects
- Create different themes
- Add export/import functionality for stats

## 📄 License

This project is open source and available under the MIT License.

## 💖 Made with Love

This extension was created with 💖 to help you stay productive while bringing a smile to your face with adorable Smiski characters!

---

**Happy Pomodoro-ing! 🍄✨**

