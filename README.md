# DoaList - Accessible Task Manager for Everyone 🌟

**DoaList** is a fully accessible, inclusive task management application specifically designed for persons with disabilities (PWDs). Built with React, TypeScript, and Tailwind CSS, it prioritizes usability, accessibility, and real-world functionality.

## ✨ Features

### 🎯 **Accessibility-First Design**
- **Screen reader support** with comprehensive ARIA labels and roles
- **Keyboard navigation** for all interactive elements
- **Large touch targets** (minimum 44px) for easy interaction
- **High contrast colors** for better visibility
- **Focus indicators** for enhanced navigation

### 🗣️ **Voice Navigation & Audio**
- **Voice command input** (e.g., "Add task: Buy groceries")
- **Text-to-speech** playback of tasks and reminders
- **Audio feedback** with customizable sound cues for actions
- **Mute toggle** for sensory-sensitive users

### 🎨 **Themes & Customization**
- **Light and dark mode** toggle
- **Adjustable text sizes** (Small, Normal, Large, Extra Large)
- **Dyslexia-friendly font** option
- **Responsive design** for mobile, tablet, and desktop

### 🎯 **Focus Mode**
- **Distraction-free interface** showing one task at a time
- **Perfect for neurodivergent users** (ADHD, autism)
- **Keyboard shortcuts** for efficient navigation
- **Progress tracking** with visual indicators

### 🌐 **Multi-Language Support**
- **English, Tagalog, Spanish, and Japanese** translations
- **Time format options** (12-hour / 24-hour)
- **Localized date formatting**

### 📱 **Progressive Web App (PWA)**
- **Installable** on mobile and desktop devices
- **Offline support** with local storage
- **Service worker** for background functionality
- **Native app-like experience**

### ⚡ **Core Task Management**
- Add, edit, delete, and complete tasks
- **Priority levels** (Low, Medium, High)
- **Categories** (Personal, Work, School)
- **Due dates** with formatted display
- **Persistent storage** using localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doalist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - The app should load with full accessibility features

### PWA Installation
- **On desktop**: Click the install button in your browser's address bar
- **On mobile**: Use "Add to Home Screen" from your browser menu
- **Offline access**: Works without internet connection after installation

## ⌨️ Keyboard Shortcuts

### Global Shortcuts
- `Ctrl+N` (or `Cmd+N` on Mac): Focus on new task input
- `Ctrl+F` (or `Cmd+F` on Mac): Toggle focus mode
- `Ctrl+D` (or `Cmd+D` on Mac): Toggle dark/light theme
- `Ctrl+,` (or `Cmd+,` on Mac): Open settings
- `Shift+?`: Show keyboard help (coming soon)

### Focus Mode Shortcuts
- `Space` or `Enter`: Complete current task
- `Delete` or `Backspace`: Delete current task
- `←` `↑`: Previous task
- `→` `↓`: Next task
- `Escape`: Exit focus mode

### Navigation
- `Tab`: Move to next interactive element
- `Shift+Tab`: Move to previous interactive element
- `Enter`: Activate buttons and links
- `Space`: Toggle checkboxes and switches

## 🗣️ Voice Commands

Activate voice commands by clicking the microphone button or using the voice panel.

### Supported Commands
- **"Add task: [task description]"** - Creates a new task
- **"Read tasks"** - Reads all current tasks aloud
- **"Focus mode"** - Toggles focus mode on/off

### Voice Navigation Setup
1. Grant microphone permissions when prompted
2. Ensure you're in a quiet environment for best recognition
3. Speak clearly and wait for the system to respond
4. Commands work in multiple languages based on your settings

## 🎛️ Settings & Customization

### Appearance Settings
- **Theme**: Toggle between light and dark modes
- **Text Size**: Choose from Small, Normal, Large, or Extra Large
- **Dyslexia Font**: Enable easier-to-read fonts for dyslexic users

### Audio & Voice Settings
- **Audio Feedback**: Toggle sound cues for actions
- **Voice Commands**: Enable/disable voice recognition
- **Volume Controls**: Adjust or mute audio feedback

### Language & Region
- **Language**: English, Tagalog, Spanish, Japanese
- **Time Format**: 12-hour (AM/PM) or 24-hour format
- **Date Localization**: Automatic based on language selection

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui with accessibility enhancements
- **Build Tool**: Vite for fast development and building
- **PWA**: Service Worker with offline capabilities

### Accessibility Standards
- **WCAG 2.1 AA** compliance
- **Section 508** compliance for government use
- **ARIA** labels and roles throughout
- **Semantic HTML** structure
- **Color contrast ratios** of 4.5:1 or higher

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with modern JavaScript support

## 🤝 Contributing

We welcome contributions that improve accessibility and usability for persons with disabilities.

### Development Guidelines
1. **Accessibility first**: Every feature must be screen reader compatible
2. **Keyboard navigation**: All interactions must work without a mouse
3. **Testing**: Test with actual assistive technologies
4. **Inclusive design**: Consider various types of disabilities

### Getting Started with Development
1. Fork the repository
2. Create a feature branch
3. Make your changes with accessibility in mind
4. Test thoroughly with keyboard and screen readers
5. Submit a pull request with detailed descriptions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

### Upcoming Features
- [ ] Task reminders and notifications
- [ ] Collaborative task sharing
- [ ] Calendar integration
- [ ] Advanced voice commands
- [ ] Gesture navigation for mobile
- [ ] High contrast mode
- [ ] Custom keyboard shortcuts
- [ ] Task templates and automation

### Accessibility Enhancements
- [ ] Screen magnifier support
- [ ] Switch control navigation
- [ ] Eye-tracking integration
- [ ] Braille display support
- [ ] Motor impairment accommodations

## 🆘 Support & Accessibility Help

If you encounter any accessibility barriers or need assistance:

### Reporting Issues
- **Accessibility bugs**: Please report with detailed descriptions
- **Screen reader issues**: Include your screen reader software and version
- **Keyboard navigation problems**: Describe the expected vs actual behavior

### Getting Help
- Check the keyboard shortcuts guide above
- Review the settings panel for customization options
- Contact our accessibility team for personalized assistance

## 🏆 Recognition

DoaList is designed with input from the disability community and follows established accessibility guidelines. We're committed to creating technology that works for everyone.

### Accessibility Features Acknowledgments
- Voice navigation powered by Web Speech API
- Audio feedback using Web Audio API
- Keyboard navigation following ARIA best practices
- Color schemes tested with colorblind users
- Text sizing based on low-vision community feedback

---

**Built with ❤️ for accessibility and inclusion**

DoaList - Making task management accessible for everyone, everywhere. 🌟