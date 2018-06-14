package com.bob;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.janeasystems.rn_nodejs_mobile.RNNodeJsMobilePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.lufinkey.react.spotify.RNSpotifyPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lufinkey.react.eventemitter.RNEventEmitterPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactlibrary.imagecolorpicker.RNImageColorPickerPackage;

import java.util.Arrays;
import java.util.List;

//import com.reactlibrary.RNSdkSpotifyPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNNodeJsMobilePackage(),
            new BlurViewPackage(),
            new RNSpotifyPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new RNEventEmitterPackage(),
              new RNImageColorPickerPackage()
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
  }
}
