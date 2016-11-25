---
published: false
---
## Certificate Pinning in Android

Certificate pinning is a security mechanism which allows HTTPS websites and applications using HTTPS services to resist impersonation by attackers using mis-issued or otherwise fraudulent certificates.

With certificate pinning it is possible to mitigate or severely reduce the effectiveness of [MiTM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) attacks enabled by spoofing a back-end server’s SSL certificate.

If you are alredy using API's or services with [OkHTTP](http://square.github.io/okhttp/) or any library that uses it, such as [Retrofit](https://square.github.io/retrofit/) or [Picasso](http://square.github.io/picasso/), the good news is that you're already half way there.

Let's look at the following example from the [documentation](https://github.com/square/okhttp/wiki/Recipes#synchronous-get):

```
private final OkHttpClient client = new OkHttpClient();
public void run(String url) throws Exception {
    Request request = new Request.Builder()
            .url(url)
            .build();

    client.newCall(request).enqueue(new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
            Log.e(TAG, "onFailure: ", e.getCause());
        }

        @Override
        public void onResponse(Call call, okhttp3.Response response) throws IOException {
            Log.d(TAG, "onResponse: " + response.body().string());

        }
    });
}
```

And you'd run it like this:

```
run("https://publicobject.com/helloworld.txt");
```

And at this point you think: 

> Great! I'm going though HTTPS, so this must be safe right?

Well... No.

With enough knowledge about proxies (N.B. I have barely just enough), one can intercept that request and see every incoming and outgoing packages... As plain text!


