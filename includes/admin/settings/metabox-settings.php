<?php

/*
 * Register the meta boxes
 * Used by MASHSB_RWMB class
 * 
 * @package MASHSB
 *
 * @2.5.6
 */

add_filter( 'mashsb_rwmb_meta_boxes', 'mashsb_meta_boxes' );

function mashsb_meta_boxes( $meta_boxes ) {
    global $mashsb_options, $post;
    $prefix = 'mashsb_';
    $post_types = isset( $mashsb_options['post_types'] ) ? $mashsb_options['post_types'] : array();
    foreach ( $post_types as $key => $value ):
        $post_type[] = $key;
    endforeach;
    $post_type[] = 'post';
    $post_type[] = 'page';

    $twitter_handle = isset( $mashsb_options['mashsharer_hashtag'] ) ? $mashsb_options['mashsharer_hashtag'] : '';

    // Setup our meta box using an array
    $meta_boxes[0] = array(
        'id' => 'mashsb_meta',
        'title' => 'MashShare Social Sharing Options',
        'pages' => $post_type,
        'context' => 'normal',
        'priority' => 'high',
        'fields' => array(
            // Setup the social media image
            array(
                'name' => '<span class="mashicon mashicon-share"></span> ' . __( 'Social Media Image', 'mashsb' ),
                'desc' => __( 'Optimal size for post shared images on Facebook, Google+ and LinkedIn is 1200px x 630px. Aspect ratio 1.9:1', 'mashsb' ),
                'id' => $prefix . 'og_image',
                'type' => 'image_advanced',
                'clone' => false,
                'max_file_uploads' => 1,
                'class' => 'mashsb-og-image'
            ),
            // Setup the social media title
            array(
                'name' => '<span class="mashicon mashicon-share"> </span> ' . __( 'Social Media Title', 'mashsb' ),
                'desc' => __( 'This title is used by the open graph meta tag og:title and will be used when users share your content on Facebook, LinkedIn, or Google+. Leave this blank to use ', 'mashsb' ) . (mashsb_yoast_active() ? __( 'Yoast Facebook / SEO title', 'mashsb' ) : 'the post title'),
                'id' => $prefix . 'og_title',
                'type' => 'textarea',
                'clone' => false,
                'class' => 'mashsb-og-title'
            ),
            // Setup the social media description
            array(
                'name' => '<span class="mashicon mashicon-share"></span> ' . __( 'Social Media Description', 'mashsb' ),
                'desc' => __( 'This description is used by the open graph meta tag og:description and will be used when users share your content on Facebook, LinkedIn, and Google Plus. Leave this blank to use ', 'mashsb' ) . (mashsb_yoast_active() ? __( 'Yoast Facebook open graph description or the post excerpt.', 'mashsb' ) : ' the post excerpt.'),
                'id' => $prefix . 'og_description',
                'type' => 'textarea',
                'clone' => false,
                'class' => 'mashsb-og-desc'
            ),
            array(
                'name' => 'divider',
                'id' => 'divider',
                'type' => 'divider'
            ),
            // Setup the pinterest optimized image
            array(
                'name' => '<span class="mashicon mashicon-pinterest"></span> ' . __( 'Pinterest Image', 'mashsb' ) . '<a class="mashsb-helper" href="#"></a><div class="mashsb-message" style="display: none;">'.sprintf(__('Get the <a href="%s" target="_blank">Network Add-On</a> to make use of the Pinterest Features','mashsb'),'https://www.mashshare.net/pricing/?utm_source=meta_box&utm_medium=core_plugin&utm_campaign=make_use_of_network_addon').'</div>',
                'desc' => __( 'Pinned images need to be more vertical than horizontal in orientation. Use an aspect ratio of 2:3 to 1:3.5 and a minimum width of 600 pixels. So an image that is 600 pixels wide should be between 900 and 2100 pixels tall.', 'mashsb' ),
                'id' => $prefix . 'pinterest-image',
                'type' => 'image_advanced',
                'clone' => false,
                'max_file_uploads' => 1,
                'class' => 'mashsb-pinterest-image'
            ),
            // Setup the pinterest description
            array(
                'name' => '<span class="mashicon mashicon-pinterest"></span> ' . __('Pinterest Description', 'mashsb' ) . '<a class="mashsb-helper" href="#"></a><div class="mashsb-message" style="display: none;">'.sprintf(__('Get the <a href="%s" target="_blank">Network Add-On</a> to make use of the Pinterest Features','mashsb'),'https://www.mashshare.net/pricing/?utm_source=meta_box&utm_medium=core_plugin&utm_campaign=make_use_of_network_addon').'</div>',
                'desc' => __( 'Place a customized message that will be used when this post is shared on Pinterest. Leave this blank to use the ', 'mashsb' ) . (mashsb_yoast_active() ? __( 'Yoast SEO title', 'mashsb' ) : __( 'the post title', 'mashsb' )),
                'id' => $prefix . 'pinterest_description',
                'type' => 'textarea',
                'clone' => false,
                'class' => 'mashsb-pinterest-desc'
            ),
            // Setup the Custom Tweet box
            array(
                'name' => '<span class="mashicon mashicon-twitter"></span> ' . __('Custom Tweet','mashsb'),
                'desc' =>  __('If this is left blank the post title will be used. ','mashsb') . (mashsb_get_twitter_username() ?  __('Based on your username @','mashsb') . mashsb_get_twitter_username() . ', ' . __('Based on the shortened post url, the current content above','mashsb') : __('Based on the shortened post url and the current content above','mashsb') ) . __(' your tweet has a maximum of 140 characters.','mashsb'),
                'id' => $prefix . 'custom_tweet',
                'type' => 'textarea',
                'clone' => false,
                'class' => 'mashsb-custom-tweet'
            ),
            array(
                'name' => 'divider',
                'id' => 'divider',
                'type' => 'divider'
            ),
            /*array(
                'id' => $prefix . 'custom_html',
                'type' => 'custom_html',
            ),*/
            array(
                'id' => $prefix . 'validate_og',
                'type' => 'validate_og',
            ),
            array(
                'id' => $prefix . 'twitter_handle',
                'type' => 'hidden_data',
                'std' => $twitter_handle,
            ),
        )
    );

    return apply_filters( 'mashsb_meta_box_settings', $meta_boxes, 10, 0 );
}

/**
 * Check if Yoast is active
 * 
 * @return boolean true when yoast is active
 */
function mashsb_yoast_active() {
    if( defined( 'WPSEO_VERSION' ) ) {
        return true;
    }
}
