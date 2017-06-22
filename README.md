# Set URL

This widget will set a URL when loaded, enabling users to bookmark or refresh the page with F5, without being reset to the homepage.

This widget works best in combination with the [Deep Link Module](https://appstore.home.mendix.com/link/app/43/Mendix/Deep-link-module) to generate the actual URL's that will be set.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Configuration

For both widgets, the 'Title' attribute is not required and is used in the replaceState call. Currently, there are no browsers that actual use this, but it is best to stay future-proof.

Both widgets set the URL when they are loaded and set it back to the application base url 'index.html' once the user navigates away.

The normal widget sets a static URL.

The context widget combines a URL prefix and postfix with an attribute to form the final URL. All these can be empty if needed.

## Technical information

This widget uses the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to set the URL.

Using the history.replaceState() call, we can overwrite the normal 'index.html' URL that's usually in the URL-bar of your application and insert a different one that matches the content that is being shown. This doesn't affect the normal browser's Back and Forward buttons.