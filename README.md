# Set URL [![Support](https://img.shields.io/badge/Mendix%20Support%3A-Community-orange.svg)](https://docs.mendix.com/community/app-store/app-store-content-support)

This widget will set a URL when loaded, enabling users to bookmark or refresh the page with F5, without being reset to the homepage.

This widget works best in combination with the [Deep Link Module](https://appstore.home.mendix.com/link/app/43/Mendix/Deep-link-module) to generate the actual URL's that will be set.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Configuration

The URL is always set as a relative path from the root location.
So if you are on the App Store, you might use this configuration:
URL: "link/apps/${appid}/${creatorcompany}"
With the attributes set to the 'AppID' and the 'Appstore.App_Creator/Appstore.Creator/Name'.

From the root url "https://appstore.home.mendix.com/index3.html", the index3.html part is replaced with the configured path.

This would result in the url:
"https://appstore.home.mendix.com/link/app/65083/Mendix"

Both widgets set the URL when they are loaded and set it back to the application normal url once the user navigates away.

The 'Set URL' widget sets a static URL.

The 'Set URL Context' widget let's you use ${} variables that will be replaced by the associated attributes.

## Technical information

This widget uses the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to set the URL.

Using the history.replaceState() call, we can overwrite the normal 'index.html' URL that's usually in the URL-bar of your application and insert a different one that matches the content that is being shown. This doesn't affect the normal browser's Back and Forward buttons.
