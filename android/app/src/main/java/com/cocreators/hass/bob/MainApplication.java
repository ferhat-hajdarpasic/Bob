package com.cocreators.hass.bob;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.tavernari.volumecontroller.ReactNativeVolumeControllerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.janeasystems.rn_nodejs_mobile.RNNodeJsMobilePackage;
import com.lufinkey.react.spotify.RNSpotifyPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lufinkey.react.eventemitter.RNEventEmitterPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.reactlibrary.imagecolorpicker.RNImageColorPickerPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import java.util.Arrays;
import java.util.List;

//import com.reactlibrary.RNSdkSpotifyPackage;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeVolumeControllerPackage(),
            new RNGoogleSigninPackage(),
            new RNNodeJsMobilePackage(),
            new RNSpotifyPackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new RNEventEmitterPackage(),
            new RNImageColorPickerPackage(),
            new TrackPlayer()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.setApplicationId("321591545340752");
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
  }
}
