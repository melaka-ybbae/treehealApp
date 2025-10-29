# Running TreeHeal App on Android Studio

## Current Status
Based on React Native doctor:
- ✅ Node.js installed
- ✅ npm installed
- ✅ Android Studio installed
- ✅ Gradlew installed
- ❌ Java JDK (Need to install)
- ❌ ANDROID_HOME (Need to set)
- ❌ Android SDK (Need to configure)
- ❌ ADB (Will work after setup)

## Step-by-Step Setup

### Step 1: Install Java JDK 17

1. **Download Java JDK 17:**
   - Go to: https://adoptium.net/temurin/releases/
   - Select:
     - Version: **17 - LTS**
     - Operating System: **Windows**
     - Architecture: **x64**
     - Package Type: **JDK**
   - Click Download

2. **Install Java JDK:**
   - Run the downloaded `.msi` file
   - Follow the installation wizard
   - Note the installation path (usually: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`)

3. **Verify Java Installation:**
   ```bash
   java -version
   ```
   Should show: `openjdk version "17.x.x"`

### Step 2: Set JAVA_HOME Environment Variable

**Option A: Using PowerShell (Run as Administrator)**
```powershell
# Replace with your actual JDK path
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Eclipse Adoptium\jdk-17.0.12-hotspot', 'Machine')

# Add to PATH
$path = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine')
[System.Environment]::SetEnvironmentVariable('PATH', "$path;%JAVA_HOME%\bin", 'Machine')
```

**Option B: Using Windows Settings (GUI)**
1. Open Start Menu → Search "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables":
   - Click "New"
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.12-hotspot`
   - Click OK
5. Find "Path" in System variables → Click "Edit"
   - Click "New"
   - Add: `%JAVA_HOME%\bin`
   - Click OK
6. **Restart your terminal** for changes to take effect

### Step 3: Configure Android SDK in Android Studio

1. **Open Android Studio**

2. **Open SDK Manager:**
   - Click on "More Actions" (three dots) or "Configure"
   - Select "SDK Manager"

3. **Install Required SDK Components:**

   **SDK Platforms Tab:**
   - ✅ Check "Android 14.0 (UpsideDownCake)" or latest
   - ✅ Check "Android 13.0 (Tiramisu)"
   - Click "Show Package Details"
   - ✅ Check "Android SDK Platform 34"
   - ✅ Check "Android SDK Platform 33"

   **SDK Tools Tab:**
   - ✅ Check "Android SDK Build-Tools 34.0.0"
   - ✅ Check "Android SDK Command-line Tools"
   - ✅ Check "Android Emulator"
   - ✅ Check "Android SDK Platform-Tools"
   - ✅ Check "Intel x86 Emulator Accelerator (HAXM installer)"

4. **Click "Apply" and wait for downloads to complete**

### Step 4: Set ANDROID_HOME Environment Variable

**Find your Android SDK location:**
- Usually: `C:\Users\pc\AppData\Local\Android\Sdk`
- In Android Studio → SDK Manager → Shows "Android SDK Location" at top

**Set ANDROID_HOME (PowerShell as Administrator):**
```powershell
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\pc\AppData\Local\Android\Sdk', 'Machine')

# Add Android tools to PATH
$path = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine')
[System.Environment]::SetEnvironmentVariable('PATH', "$path;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin", 'Machine')
```

**Or using Windows Settings (GUI):**
1. Open Environment Variables (same as Step 2)
2. Under "System variables" → Click "New"
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\pc\AppData\Local\Android\Sdk`
   - Click OK
3. Edit "Path" → Add these entries:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`
4. Click OK and **restart your terminal**

### Step 5: Create Android Virtual Device (AVD)

1. **Open Android Studio**

2. **Open Device Manager:**
   - Click on "Device Manager" icon (phone icon) on the right side
   - Or go to: Tools → Device Manager

3. **Create Virtual Device:**
   - Click "Create Device"
   - Select a phone model (e.g., **Pixel 5** or **Pixel 6**)
   - Click "Next"

4. **Download System Image:**
   - Select a system image (e.g., **Android 13.0 (Tiramisu) API 33**)
   - Click "Download" if not already downloaded
   - Wait for download to complete
   - Click "Next"

5. **Configure AVD:**
   - Give it a name (e.g., "Pixel_5_API_33")
   - Click "Finish"

### Step 6: Verify Setup

**Close and reopen your terminal, then run:**
```bash
# Check Java
java -version

# Check Android environment
echo %ANDROID_HOME%
echo %JAVA_HOME%

# Check ADB
adb version

# Check React Native doctor
npx react-native doctor
```

All checks should pass ✅

### Step 7: Run Your App on Android Emulator

1. **Start the Android Emulator:**
   - Open Android Studio → Device Manager
   - Click the ▶ (Play) button next to your virtual device
   - Wait for emulator to fully boot (shows home screen)

2. **In your project terminal, run:**
   ```bash
   # Start Metro bundler in one terminal
   npm start
   ```

3. **In another terminal, run:**
   ```bash
   # Build and run on Android
   npm run android
   ```

4. **Wait for build to complete** (first build takes 5-10 minutes)

5. **App should open on the emulator!**

---

## Quick Commands

### Start Emulator from Command Line
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_5_API_33
```

### Restart Everything
```bash
# Kill Metro bundler
npx react-native start --reset-cache

# Clean build
cd android
./gradlew clean
cd ..

# Run again
npm run android
```

---

## Troubleshooting

### Error: "JAVA_HOME is not set"
- Make sure you **restarted your terminal** after setting environment variables
- Verify: `echo %JAVA_HOME%` shows correct path

### Error: "SDK location not found"
- Make sure ANDROID_HOME is set correctly
- Verify: `echo %ANDROID_HOME%` shows correct path

### Error: "No devices connected"
- Make sure emulator is running (green play icon in Android Studio Device Manager)
- Check: `adb devices` should list your emulator

### Build Errors
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues
```bash
# Reset cache
npm start -- --reset-cache
```

---

## Alternative: Use Physical Android Device

If you have an Android phone:

1. **Enable Developer Mode:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging:**
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

3. **Connect via USB:**
   - Connect phone to computer
   - Allow USB debugging on phone

4. **Run app:**
   ```bash
   npm run android
   ```

---

## Expected Timeline

- ⏱ Java JDK installation: 5 minutes
- ⏱ Android SDK setup: 10-15 minutes (downloads)
- ⏱ Creating AVD: 5 minutes
- ⏱ First build: 5-10 minutes
- ⏱ Subsequent builds: 1-2 minutes

**Total setup time: ~30-45 minutes**

---

## After Setup is Complete

Run these two commands:

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Run on Android
npm run android
```

Your TreeHeal Insurance App will launch on the Android emulator! 🎉
