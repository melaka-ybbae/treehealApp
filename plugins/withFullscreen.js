const { withAndroidManifest, withMainActivity } = require('@expo/config-plugins');

/**
 * Android Manifest에 전체화면 설정 추가
 */
const withFullscreenManifest = (config) => {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application[0];

    // HTTP 접속 허용
    application.$['android:usesCleartextTraffic'] = 'true';

    const mainActivity = application.activity.find(
      (activity) => activity.$['android:name'] === '.MainActivity'
    );

    if (mainActivity) {
      mainActivity.$['android:windowFullscreen'] = 'true';
    }

    return config;
  });
};

/**
 * MainActivity.kt에 전체화면 코드 추가
 */
const withFullscreenActivity = (config) => {
  return withMainActivity(config, (config) => {
    let content = config.modResults.contents;

    // import 추가
    if (!content.includes('import android.view.View')) {
      content = content.replace(
        'import android.os.Bundle',
        'import android.os.Bundle\nimport android.view.View\nimport android.view.WindowManager'
      );
    }

    // onCreate 메서드에 전체화면 코드 추가
    const fullscreenCode = `
    // 전체화면 모드 설정
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      // Android 11 (API 30) 이상
      window.setDecorFitsSystemWindows(false)
      window.insetsController?.let {
        it.hide(android.view.WindowInsets.Type.statusBars() or android.view.WindowInsets.Type.navigationBars())
        it.systemBarsBehavior = android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
      }
    } else {
      // Android 10 (API 29) 이하
      @Suppress("DEPRECATION")
      window.decorView.systemUiVisibility = (
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        or View.SYSTEM_UI_FLAG_FULLSCREEN
        or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
      )
    }

    // 화면이 꺼지지 않도록 설정
    window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)`;

    // super.onCreate(null) 뒤에 코드 삽입
    if (!content.includes('전체화면 모드 설정')) {
      content = content.replace(
        'super.onCreate(null)',
        `super.onCreate(null)
${fullscreenCode}`
      );
    }

    config.modResults.contents = content;
    return config;
  });
};

/**
 * 전체화면 플러그인
 */
module.exports = function withFullscreen(config) {
  config = withFullscreenManifest(config);
  config = withFullscreenActivity(config);
  return config;
};
