---
published: false
---
## Certificate Pinning in Android

Certificate pinning is a security mechanism which allows HTTPS websites and applications using HTTPS services to resist impersonation by attackers using mis-issued or otherwise fraudulent certificates.

With certificate pinning it is possible to mitigate or severely reduce the effectiveness of [MiTM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) attacks enabled by spoofing a back-end server’s SSL certificate.

If you are alredy using API's or services with [OkHTTP](http://square.github.io/okhttp/) or any library that uses it, such as [Retrofit](https://square.github.io/retrofit/) or [Picasso](http://square.github.io/picasso/), the good news is that you're already half way there.

Let's look at the following example from the documentation:

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
