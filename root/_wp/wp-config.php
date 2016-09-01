<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */


/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') ) {
  define('ABSPATH', dirname(__FILE__) . '/');
}

define( 'PROJECT_ROOT', realpath( ABSPATH.'../../').'/' );


if( ! ( file_exists(PROJECT_ROOT.'.env') and file_exists(PROJECT_ROOT.'wp-config.json') ) ) {
  die();
}


$environmentName = file_get_contents( PROJECT_ROOT.'.env' );

$config = json_decode( file_get_contents( PROJECT_ROOT.'wp-config.json' ), true );
$environment = $config['environments'][$environmentName];

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', $environment['DB_NAME']);

/** MySQL database username */
define('DB_USER', $environment['DB_USER']);

/** MySQL database password */
define('DB_PASSWORD', $environment['DB_PASSWORD']);

/** MySQL hostname */
define('DB_HOST', $environment['DB_HOST']);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '>xf?ZGgtDs)<lbf%EYvW&Az_LN@*??_9rEccmnb$%dfufmou9Msqvmg3kA)>Z<1f');
define('SECURE_AUTH_KEY',  'XhSb()7R2,^&5#il>!Xz!_,i@q+$vSeTmj>5S0vEl%SJ39Ukr8d@%s1cXbwdE9F.');
define('LOGGED_IN_KEY',    'hTPX9oNdoK<NnBI<<jTQ8ehBeP9g#6<*zOGE_,mHBXuCY2G@QmHiVVN0NI8*Jfi2');
define('NONCE_KEY',        'iDYk@rRg5h1Y#(9>*h9b(^s4KfzQ5ko?j@jh#K(x?$aGgA)1w9Y!N?$_vbM3>IY6');
define('AUTH_SALT',        '73vyX@t<jfs$Su1A.aG+VsMSnrlNeJX6#xyaQ4wg1eR,E,#EnYF9QyRL.(GHybDg');
define('SECURE_AUTH_SALT', 'GCAvRZNM8#S,eS4vwVSNW94h9dh4DJ)jWdUR2ZLKsoL4zEP#cZ>a^tuhOlCBhZLI');
define('LOGGED_IN_SALT',   '<qXo6<Qy)Ae))XD(YZs1v6iN!cStL8NF5XEb2C?NUM6&^4rH!rrJoQ8Mp$rlh^2N');
define('NONCE_SALT',       'jFjgnNaLn5jBbja9$w&<UN,DyZqEY&2U$SDRUDOIKI&,Jp#wBk+XslNzm4)u7OZd');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
