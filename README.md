# Camera App

Welcome to the Camera App repository! This is a React Native mobile application built with Expo that allows users to capture, manage, and geotag photos. The app is written in TypeScript and provides a seamless camera experience with location tracking capabilities.

## Features

- 📸 Photo capture using device camera
- 📱 Image picker from device gallery
- 📍 Location tracking and geotagging
- 💾 Local storage for captured images
- 🔒 Permission handling for camera and location
- 📱 Cross-platform support (iOS and Android)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Expo CLI installed globally:
  ```bash
  npm install -g expo-cli
  ```
- A mobile device with Expo Go installed ([iOS App Store](https://apps.apple.com/app/expo-go/id982107779) | [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with Android SDK

## Project Structure

```
camera-app/
├── app/              # Main application screens and components
├── assets/           # Static assets (images, fonts)
├── utils/            # Utility functions and helpers
├── .expo/            # Expo configuration
├── eas.json         # Expo Application Services config
├── tsconfig.json    # TypeScript configuration
└── package.json     # Project dependencies
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/camera-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd camera-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Configure environment:
   - Copy `eas.json.example` to `eas.json` (if it exists)
   - Update any necessary configuration values

## Required Permissions

The app requires the following permissions:
- Camera access
- Photo library access
- Location services
- Storage access (Android)

These will be requested automatically when needed.

## Development

1. Start the development server:
   ```bash
   npm start
   ```

2. Use Expo Go:
   - Scan the QR code with your mobile device's camera
   - Make sure your device is on the same network as your development machine

3. Running on simulators:
   - iOS: `npm run ios`
   - Android: `npm run android`

## Debugging

- Shake your device or press Cmd+D (iOS) or Ctrl+M (Android) in the simulator to open the developer menu
- Use React Native Debugger or Chrome DevTools for debugging
- Check Expo logs in the terminal for build and runtime errors

## Building for Production

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Build for your platform:
   ```bash
   # For Android
   eas build --platform android
   # For iOS
   eas build --platform ios
   ```

## Troubleshooting

Common issues and solutions:

1. **Metro bundler issues**
   ```bash
   # Clear Metro cache
   npm start -- --clear
   ```

2. **Dependencies issues**
   ```bash
   # Reset node_modules
   rm -rf node_modules
   npm install
   ```

3. **Expo Go connection issues**
   - Ensure device and computer are on the same network
   - Try switching between Tunnel, LAN, and Local connection types

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

If you have any questions or run into issues, please open an issue in the repository.

## Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
