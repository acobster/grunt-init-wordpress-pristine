# Pristine WordPress

An opinionated starter repo for use with Grunt-init. Contains everything you need to automatically bootstrap the codebase for a full WordPress site **without keeping your dependencies in version control**.

## Say what?!

Y'know. Dependencies. The things you trust **other** people to maintain and therefore keep **out of your own repo**. Things like:

* Plugins
* Themes
* Yes, even the WP core.

## How?

Pull in the core/plugins/themes at deploy time and put everything...in its right place. It's not rocket science.

## OK, show me!

```
$ git clone git@github.com:acobster/grunt-init-wordpress-pristine.git ~/.grunt-init/wordpress-pristine
$ grunt-init wordpress-pristine
```

After answering some basic questions about your new WordPress project, edit your `composer.json` file and configure your desired plugins as dependencies (you should have been prompted for a theme already). **This architecture assumes you are following the WPackagist convention by declaring themes and plugins as composer packages.** More info about this convention [here](https://roots.io/using-composer-with-wordpress/).

Once you've configured your theme and plugins (and also set up your MySQL database), run:

```
$ npm install
$ grunt start
```

Answer the prompts and you'll have a working WordPress website running with a document root of `public`!

## Configuration

When setting up the DNS for your WordPress site, set the document root to `public/` directory of this repo. Configuration is driven by a `config.json` file that lives outside of the web root, keeping your sensitive data that much safer. `public/wp/wp-config.php` reads environment configurations from this JSON file instead of declaring constants like `DB_PASSWORD` directly.

