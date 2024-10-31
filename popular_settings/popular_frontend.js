function nr_mp_get_url_cookie(){ 
	var NameOfCookie="urlprev";
	if (document.cookie.length > 0) { 
		begin = document.cookie.indexOf(NameOfCookie+"="); 
		if (begin != -1) { 
			begin += NameOfCookie.length+1; 
			end = document.cookie.indexOf(";", begin);
			if (end == -1) 
				end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end)); 
		}
	}
	return null; 
}

function nr_mp_set_url_cookie(url,domain) { 
	var NameOfCookie="urlprev";
	var ExpireDate = new Date ();
	// Expiration date set to 2 hours. Must give at least 2 hours until view gets incremented for this url per user.
	ExpireDate.setTime(ExpireDate.getTime() + (60000));
	document.cookie = NameOfCookie + "=" + escape(url) + "; expires=" + ExpireDate.toGMTString()+"; path=/" + "; domain="+domain ;
}