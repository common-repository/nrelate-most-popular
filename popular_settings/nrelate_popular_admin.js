// Takes values from input fields, makes appropriate conversions
// Opens a pop up window with preview url with these parameters
function nrelate_popular_popup_preview(NRELATE_POPULAR_SETTINGS_URL,wp_root_nr, NRELATE_POPULAR_API_VERSION){
	if (!window.focus)return true;
	var nr_thumbsize, nr_maxageposts, nr_p_view_lang,nr_age_num,age_frame, nr_href, nr_imageurl, nr_title, nr_numberpopular, nr_p_title, nr_p_show_post_title, nr_p_max_char_perline, nr_p_show_post_excerpt, nr_p_max_char_post_excerpt, nr_ad, nr_logo, nr_thumb, nr_adval, nr_logoval, nr_thumbval,nr_p_showviews,nr_showviews;
	nr_title = "Nrelate_Preview";
	nr_href = 'http://api.nrelate.com/mpw_wp/' + NRELATE_POPULAR_API_VERSION + '/nrelate_popup_content.php';
	nr_numberpopular = document.getElementById("popular_number_of_posts").value;
	nr_p_title = document.getElementById("popular_title").value;
	nr_p_show_post_title = document.getElementById("popular_show_post_title").checked;
	nr_p_max_char_perline = document.getElementById("popular_max_chars_per_line").value;
	nr_p_show_post_excerpt = document.getElementById("popular_show_post_excerpt").checked;
	nr_p_max_char_post_excerpt = document.getElementById("popular_max_chars_post_excerpt").value;
	nr_adval = document.getElementById("show_ad").checked;
	nr_num_ads = document.getElementById("popular_number_of_ads").value;
	nr_ads_placement = document.getElementById("popular_ad_placement").value;
	nr_logoval = document.getElementById("show_logo").checked;
	nr_thumbval = document.getElementById("popular_thumbnail").value;
	nr_thumbstyle = document.getElementById('popular_imagestyle').value;
	nr_textstyle = document.getElementById('popular_textstyle').value;
	nr_imageurl = document.getElementById("popular_default_image").value;
	nr_age_num = document.getElementById("popular_max_age_num").value;
	nr_age_frame = document.getElementById("popular_max_age_frame").value;
	nr_p_showviews = document.getElementById("popular_showviews").checked;
	nr_p_view_lang = document.getElementById("popular_view").value;
	nr_p_title = escape(nr_p_title);
	nr_thumbsize = document.getElementById("popular_thumbnail_size").value;
	
	switch (nr_age_frame){
		case 'Hour(s)':
			nr_maxageposts = nr_age_num * 60;
			break;
		case 'Day(s)':
			nr_maxageposts = nr_age_num * 1440;
			break;
		case 'Week(s)':
			nr_maxageposts = nr_age_num * 10080;
			break;
		case 'Month(s)':
			nr_maxageposts = nr_age_num * 44640;
			break;
		case 'Year(s)':
			nr_maxageposts = nr_age_num * 525600;
			break;
		}
			// Convert show post title parameter
	switch (nr_p_show_post_title){
	case true:
		nr_p_show_post_title = 1;
		break;
	default:
		nr_p_show_post_title = 0;
	}
	
	// Convert show post excerpt parameter
	switch (nr_p_show_post_excerpt){
	case true:
		nr_p_show_post_excerpt = 1;
		break;
	default:
		nr_p_show_post_excerpt = 0;
	}
	
	// Convert ad parameter
	switch (nr_adval){
	case true:
		nr_ad = 1;
		break;
	default:
		nr_ad = 0;
	}
	
	// Convert logo parameter
	switch (nr_p_showviews){
	case true:
		nr_showviews = 1;
		break;
	default:
		nr_showviews = 0;
	}
	
	switch (nr_logoval){
	case true:
		nr_logo = 1;
		break;
	default:
		nr_logo = 0;
	}
	
	// Convert thumbnail parameter
	switch (nr_thumbval){
	case 'Thumbnails':
		nr_thumb = 1;
		break;
	default:
		nr_thumb = 0;
	}

	nr_tag = "?NUM="+nr_numberpopular+"&DOMAIN="+wp_root_nr+"&IMAGEURL="+escape(nr_imageurl)+"&TITLE="+escape(nr_p_title)+"&SHOWPOSTTITLE="+nr_p_show_post_title+"&MAXCHAR="+nr_p_max_char_perline+"&SHOWEXCERPT="+nr_p_show_post_excerpt+"&MAXCHAREXCERPT="+nr_p_max_char_post_excerpt+"&AD="+nr_ad+"&LOGO="+nr_logo+"&THUMB="+nr_thumb+"&MAXAGE="+nr_maxageposts+"&THUMBSIZE="+nr_thumbsize+"&POPULAR_VERSION="+NRELATE_POPULAR_API_VERSION;
	nr_tag += '&NUMADS='+nr_num_ads+'&ADSPLACE=' + nr_ads_placement+ '&THUMBSTYLE=' + nr_thumbstyle + '&TEXTSTYLE=' + nr_textstyle + '&SHOWVIEWS=' + nr_showviews + '&VIEW='+nr_p_view_lang;
	if (jQuery('#ad_animation').is(':checked')) nr_tag += '&AD_ANIMATION=1';
	
	nr_link = nr_href+nr_tag;
	//window.open(nr_link,nr_title,'width=600,height=400,scrollbars=yes');
	//return false;
	return nr_link;
}

function nr_mp_iframe_reload(){
	document.getElementById('TB_iframeContent').src = nrelate_popular_popup_preview(nr_mp_plugin_settings_url, nr_plugin_domain, nr_mp_plugin_version)+'&TB_iframe=1&width=822&height=372';
	jQuery('#TB_iframeContent').unbind('load');
}


jQuery(document).ready(function($){
	$('.nrelate-thumbnail-style-prev').click(function(){
		$('#popular_imagestyle').val( $(this).parents('div:first').find('input:first').val() );
	});

	$('.nrelate-text-style-prev').click(function(){
		$('#popular_textstyle').val( $(this).parents('div:first').find('input:first').val() );
	});
	
	$('.nrelate_preview_button').click(function(event){
		event.preventDefault();
		
		if ($('#popular_thumbnail').val() == 'Thumbnails') {
			if ($('#popular_imagestyle').val() == 'none') return;
		} else {
			if ($('#popular_textstyle').val() == 'none') return;
		}
		
		_url = nrelate_popular_popup_preview(nr_mp_plugin_settings_url, nr_plugin_domain, nr_mp_plugin_version)+'&TB_iframe=1&width=822&height=372';
		tb_show('nRelate - preview', _url, false);
		$('#TB_iframeContent').load(function(){
			nr_mp_iframe_reload();
		});
	});
	
	$('#show_ad').click(function(){
		$('#ads_warning').slideDown('fast');
	});
});