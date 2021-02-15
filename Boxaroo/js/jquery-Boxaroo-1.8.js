/* $Boxaroo v1.8 jQuery Plugin || Author: Crusader 12 || crusader12.com || Exclusive to CodeCanyon  */
/* EXTEND NATIVE CLASSES */
String.prototype.removeWS=function(){return this.toString().replace(/\s/g, '');};
String.prototype.fixColor=function(){return '#'+this.toString().replace('#','').replace(/\s/g, '');};
String.prototype.pF=function(){return parseFloat(this);};
Number.prototype.pF=function(){return parseFloat(this);};
String.prototype.sP=function(splitter,key){return this.toString().split(splitter)[key];};
String.prototype.isB=function(){return this.toString()=="true"?true:false;};
Boolean.prototype.isB=function(){return (this==true)?true:false;};

(function($){
var $win=window, $doc=document,
	Boxaroo={
	cOBJ:null, pOBJ:null, conW:null, conH:null,
	iniW:0,	scF:1,
	SSTime:null, cAngle:null, cSkewX:null, cSkewY:null, cFlipX:null, cFlipY:null, mouseX:null, mouseY:null,
	orientTime:null, isNav:false,
	winW:$win.innerWidth?$win.innerWidth:$($win).width(), winH:$win.innerHeight?$win.innerHeight:$($win).height(),
	iniArea:($win.innerWidth?$win.innerWidth:$($win).width())*($win.innerHeight?$win.innerHeight:$($win).height()),

	/* SKIN 1 = DEFAULTS || GENERAL */
	defaults:{'min_dimensions':'0,0', 'edge_buffers':'25,25', 'scaling':true, 'full_size':false,'jquerytransforms':true,	
	'chrome_animations':'css3','opera_animations':'css3','ie_animations':'css3','firefox_animations':'css3','safari_animations':'css3',	
	'boostmobile':'false,false','size_ext':'null,null','transition_timing':'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
	'stack_order':'overlay,tile,bg_image,lightbox,el1,el2,el3,caption,counter,next_button,prev_button,close_button','call_on_start':false,
	/* EVENT */'error_text':'There was an error loading the content. Please try again later.',	
	'key_nav':true, 'nav_reverse':false, 'nav_vertical':false,'scrollbars':'false,true','overlay_close':true,
	'vm_events':true, 'vm_distance':50, 'vm_axis_threshold':500,'touch_events':true,'mousewheel_nav':true,
	'gradient_nav':true,'gradient_nav_color':'#FFFFFF,#FFFFFF','gradient_nav_opacity':'0.5,0.5','gradient_nav_speed':'150,150',
	/* OVERLAY */'bg_speed':'300,300,400,5000','bg_color':'#6b707c','bg_opacity':1,'bg_tile':61,'bg_tile_opacity':0.70,
	'bg_pic':101,'bg_pic_opacity':0.80, 
	/* PRELOADER */'preloader_speed':'200,200', 'preloader_style':2, 'preloader_color':'#f5f5f6,#989ca4',
	/* LB & CONTENT */'box_speed':'400,300,400','content_speed':'1000,300,300','content_size':'1,1',
	'lightbox_effect':'grow,shrink','lightbox_movement':'center,center','nav_movement':false,
	/* MATTE */'matte_size':'3,3,3,3','matte_color':'#d3d3d3','matte_clr_speed':5000,'matte_bg':false,'scale_matte':true,
	/* SLIDESHOW */'slideshow':'false,true','slide_display_time':3000,'close_at_end':true,'slideshow_counter_direction':'right',
	'slideshow_container_color':'#828282,#bfbfbf','slideshow_counter_color':'#f5f5f6,#565a62',
	/* BORDER */'border':'5,#f5f5f6', 'border_radius':'10,10,10,10','scale_border':'true,true',
	/* SHADOW */'drop_shadow':'0,5,13,0,#565a62,0.5','scale_shadow':true,
	/* SPIRAL */'spiral':'false,false,false', 'spiral_direction':'false,false', 'spiral_control':'500,5', 'spiral_speed':'500,500,500',
	/* VIDEO */'autoplay':true, 'loop':true, 'video_color':'#FFFFFF', 'auto_advance':true,
	/* FRAME ANIMATIONS */'frame_animation':false, 'frame_speed':4000, 'frame_count':'infinite', 'frame_direction':'alternate',
	'perspective':1000,'frame_perspective':1000,'flip':'0,0','frame_flip':'0,0','rotate':0,'frame_rotate':0,'skew':'0,0','frame_skew':'0,0',
	'translate':'0,0','frame_translate':'0,0','scale':'1,1','frame_scale':'1,1','frame_border':'5,#f5f5f6','frame_drop_shadow':'0,5,13,0,#565a62,0.5','frame_nav_override':false,
	/* FILTERS */'content_blur':'0px','frame_content_blur':'0px','grayscale':'0%','frame_grayscale':'0%','sepia':'0%','frame_sepia':'0%',
	'contrast':'0%','frame_contrast':'0%','brightness':'100%','frame_brightness':'100%','hue_rotate':360,'frame_hue_rotate':360,'saturation':'100%','frame_saturation':'100%',	
	/* NAV */'nav_buttons':'true,true,true', 'nav_speed':300, 'nav_style':'1,1,1','nav_buttons_dimensions':'64,64||64,64||64,64',
	'nav_buttons_ranges':'30,50||40,70||40,70', 'nav_pos':'11,16,12||11,16,12', 'nav_hover_speed':'200,200||200,200||200,200',
	'nav_buttons_offsets':'11,17||-25,-25||20,-25', 'nav_buttons_m_offsets':'0,0||0,0||0,0', 'nav_mobile_size':'1,1,1',
	'nav_button_scale':'0.75,1||0.75,1||0.75,1','nav_button_rotate':'0,180||0,0||0,0','nav_button_flipX':'0,0||0,0||0,0',
	'nav_button_flipY':'0,0||0,0||0,0','nav_buttons_m_speed':'500,500,500','nav_buttons_opacity':'1,1||1,1||1,1', 
	/* ELEMENTS */'html_els':'false,false,false', 'html_els_pos':'17,24,23||17,24,23', 'html_els_opacity':'1,1,1',
	'html_els_offsets':'0,0||0,0||0,0', 'html_els_m_offsets':'0,0||0,0||0,0', 'html_els_m_speed':'500,500,500',
	'html_els_ranges':'30,70||30,70||30,70', 'html_els_speed':'500,500||500,500||500,500', 
	/* COUNTERS */'counter':false, 'counter_pos':'10,10', 'counter_offsets':'0,0', 'counter_ranges':'30,80', 
	'counter_speed':'500,500', 'counter_control':'true,Image,of', 'counter_m_offsets':'0,0', 'counter_m_speed':500,
	/* CAPTIONS */'caption':true, 'caption_pos':'14,14', 'caption_offsets':'0,20', 'caption_ranges':'30,80',
	'caption_speed':'500,500', 'caption_control':'false,true', 'caption_m_offsets':'0,0', 'caption_m_speed':500,
	/* HIGHLIGHT */'highlight_type':'ellipse','highlight_pos':'1500,-2500||-1700,1000','highlight_color':'#FFFFFF,#FFFFFF,#FFFFFF','highlight_speed':5000,
	'highlight_opacity':'0,0.25,0','highlight_stops':'4,85,100','highlight_size':'500%,500%','highlight_frame_opacity':'1,0.75',
	/* HOVER */'alt_hover':false,'hover_color':'none','hover_icon_size':0.4,'hover_style':8,'hover_speed':'150,150||150,150||150,250',
	'hover_opacity':'0.5,0.75','hover_type':'icon','hover_target':null,
	'hover_perspective':800,'hover_flip':'0,0','hover_rotate':0,'hover_skew':'0,0','hover_translate':'0,0','hover_scale':'1,1',
	/* HOOKS */'js_open':null,'js_open_nav':null,'js_close':null,'js_navigate':null,'js_nav_fwd':null,'js_nav_back':null,'js_next_hover':null,'js_prev_hover':null,
	'js_close_hover':null,'js_slideshow_end':null,'js_el1_click':null,'js_el2_click':null,'js_el3_click':null},

init:function(options){/* EXTEND PLUGIN SETTINGS */
	switch(options.skin){
		case 2: 
			var skinDef={'edge_buffers':'20,20',
			/* EVENT */'gradient_nav_color':'#c5c5bd,#c5c5bd',
			/*OVERLAY */'bg_color':'#8e8e94,#dfdfd1','bg_tile':17,'bg_tile_opacity':0.30,'bg_pic':104,'bg_pic_opacity':0.35,
			/* PRELOADER */'preloader_style':3,'preloader_color':'#d3d8d4,#858585',
			/* MATTE */'matte_color':'#c5c5bd,#cbcbc6','matte_clr_speed':2500,
			/* BORDER */'border':'1,#eff1ed',
			/* SLIDESHOW */'slideshow_container_color':'#d3d8d4,#858585','slideshow_counter_color':'#858585,#d3d8d4',			
			/* SHADOW */'drop_shadow':'0,20,15,5,#828282,0.05',
			/* FRAME ANIMATIONS */'frame_animation':true, 'frame_speed':2500,'frame_translate':'0,-5','frame_scale':'0.98,0.98','frame_border':'1,#dededc',
			'frame_drop_shadow':'0,5,10,0,#828282,0.5',
			/* VIDEO */'video_color':'#d9d9d9',
			/* NAV */'nav_buttons':'false,true,true','nav_style':'5,5,5','nav_pos':'13,24,20||14,16,12',
			'nav_buttons_offsets':'10,5||-20,-20||20,-20',
			'nav_buttons_m_offsets':'10,5||-20,-20||20,-20',
			'nav_buttons_opacity':'0.35,0.9||0.35,0.9||0.35,0.9','nav_button_scale':'1,1.2||1,1.2||1,1.2',
			/* COUNTERS */'counter':true, 'counter_pos':'13,13', 'counter_offsets':'-40,38','counter_m_offsets':'-40,38','counter_ranges':'90,90',
			/* CAPTIONS */'caption_pos':'13,13', 'caption_offsets':'-40,15','caption_m_offsets':'-40,15','caption_ranges':'90,90',
			/* HIGHLIGHT */'highlight_pos':'-800,-400||-750,-400','highlight_speed':2000,'highlight_opacity':'0,0.75,0','highlight_size':'100%,200%',
			'highlight_frame_opacity':'0,0.35',
			/* HOVER */'hover_color':'#e4e7e2','hover_opacity':'0.5,0.85','hover_type':'caption','hover_speed':'300,150||500,150||500,250'}; break;
	case 3: 
		var skinDef={'edge_buffers':'30,30',
			/* EVENT */'gradient_nav_color':'#f3f0e8,#f3f0e8','gradient_nav_opacity':'0.65,0.65',
			/* OVERLAY */'bg_speed':'400,600,600,7000','bg_tile':4,'bg_color':'#d8d4c1','bg_tile_opacity':0.5,'bg_pic':163,'bg_pic_opacity':.5,
			/* PRELOADER */'preloader_style':10, 'preloader_color':'#b2b0ab,#d8d4c1',
			/* LB & CONTENT */'nav_movement':true, 'lightbox_movement':'bottom,top',
			/* MATTE */'matte_size':'18,18,18,18', 'matte_color':'#b2b0ab', 'matte_clr_speed':500, 'matte_bg':19,
			/* SLIDESHOW */'slideshow_container_color':'#b6b4ad,#d8d4c1','slideshow_counter_color':'#d8d4c1,#b6b4ad',
			/* BORDER */'border':'2,#b6b4ad', 'border_radius':'0,0,0,0',
			/* SHADOW */'drop_shadow':'0,0,5,5,#bcb9b4,0.75',
			/* VIDEO */'video_color':'#f2edcc',			
			/* FRAME ANIMATIONS */'frame_animation':true,'frame_speed':1500,'frame_border':'2,#b6b4ad','frame_drop_shadow':'0,0,20,5,#bcb9b4,1',
			/* NAV */'nav_buttons':'false,true,true','nav_style':'15,15,15','nav_pos':'3,16,12||3,16,12','nav_buttons_offsets':'0,0||-10,-20||10,-20',
			'nav_buttons_ranges':'50,80||50,80||50,80','nav_button_rotate':'0,0||0,0||0,0','nav_buttons_opacity':'0.15,0.25||0.15,0.25||0.15,0.25', 
			/* CAPTIONS */'caption_control':'true,true','caption_m_offsets':'0,20','caption_ranges':'60,80',
			/* HIGHLIGHT */'highlight_pos':'-800,-250||-800,800','highlight_speed':false,'highlight_opacity':'0,0.95,0','highlight_size':'250%,250%',
			'highlight_frame_opacity':'0.10,0',
			/* HOVER */'hover_color':'#c2bfbb','hover_opacity':'0.5,0.35','hover_type':'caption'}; break;
	case 4:   
		var skinDef={'edge_buffers':'20,20',
			/* EVENT */'gradient_nav_color':'#b4d5e8,#b4d5e8',
			/* OVERLAY */'bg_color':'#53a8db','bg_tile':106,'bg_tile_opacity':0.05,'bg_pic':false,
			/* PRELOADER */'preloader_style':5,'preloader_color':'#FFFFFF,#5cacdd',			
			/* LB & CONTENT */'lightbox_effect':'grow,grow','box_speed':'300,500,500','content_speed':'800,300,300',
			/* MATTE */'matte_size':'8,8,8,8','matte_color':'#e0f3f9',
			/* SLIDESHOW */'slideshow_container_color':'#5cacdd,#FFFFFF','slideshow_counter_color':'#FFFFFF,#5cacdd',
			/* BORDER */'border':'2,#5cacdd', 'border_radius':'7,7,7,7',
			/* SHADOW */'drop_shadow':'-10,-10,15,5,#22284a,0.15',
			/* VIDEO */'video_color':'#5cacdd',			
			/* FRAME ANIMATIONS */'frame_animation':true,'frame_speed':2500,'frame_count':1,'translate':'0,-20','frame_translate':'0,-20',
			'scale':'0.75,0.75','frame_border':'2,#5cacdd','frame_drop_shadow':'0,5,15,5,#22284a,0.25',
			/* NAV */'nav_buttons':'true,false,false','nav_style':'10,10,10','nav_pos':'19,16,12||19,16,12','nav_button_scale':'0.5,0.75||0.5,0.75||0.5,0.75',
			'nav_buttons_offsets':'-30,10||0,0||0,0','nav_buttons_opacity':'0.25,1||0.75,1||0.75,1','nav_button_rotate':'0,360||0,0||0,0',
			/* COUNTERS */'counter':true, 'counter_pos':'21,21', 'counter_offsets':'-50,-10','counter_ranges':'50,50',
			/* CAPTIONS */'caption_pos':'23,23', 'caption_offsets':'0,0','caption_control':'true,true','caption_ranges':'50,50',
			/* HIGHLIGHT */'highlight_pos':'800,800||2,2','highlight_speed':2500,'highlight_opacity':'1,1,0','highlight_size':'250%,250%','highlight_frame_opacity':'1,0',
			/* HOVER */'hover_color':'#55a8db','hover_icon_size':0.2,'hover_style':10,'hover_opacity':'0.9,1'}; break;
	case 5: 
    	var skinDef={'edge_buffers':'20,20','gradient_nav_opacity':'0.25,0.25',
			/* OVERLAY */'bg_color':'#91c444','bg_tile':32,'bg_tile_opacity':0.05,'bg_pic':false,'bg_pic_opacity':0,
			/* PRELOADER */'preloader_style':1,'preloader_color':'#FFFFFF,#c2e19f',
			/* LB & CONTENT */'lightbox_effect':'match,match','lightbox_movement':'left,right','nav_movement':true,
			/* MATTE */'matte_size':'20,18,20,18','matte_color':'#FFFFFF',
			/* SLIDESHOW */'slideshow_container_color':'#c2e19f,#FFFFFF','slideshow_counter_color':'#FFFFFF,#c2e19f',
			/* BORDER */'border':'2,#bde97a', 
			/* SHADOW */'drop_shadow':'0,0,5,5,#87b73f,1',
			/* VIDEO */'video_color':'#87b73f',				
			/* FRAME ANIMATIONS */'frame_speed':6000,'frame_border':'2,#bde97a','frame_drop_shadow':'0,0,5,5,#87b73f,1','frame_nav_override':true,
			/* NAV */'nav_style':'18,18,18','nav_pos':'11,16,12||11,16,12','nav_button_rotate':'0,0||0,0||0,0',
			'nav_buttons_offsets':'4,-3||0,0||0,0', 
			/* COUNTERS */'counter':true,'counter_pos':'13,13', 'counter_offsets':'-10,13','counter_control':'true, ,of',
			/* CAPTIONS */'caption_pos':'15,15','caption_offsets':'10,13',
			/* HIGHLIGHT */'highlight_pos':'-2500,-1500||-2500,500','highlight_speed':8000,
			'highlight_opacity':'0,0.15,0','highlight_stops':'50,52,55','highlight_size':'700%,500%','highlight_frame_opacity':'1,0.75',
			/* HOVER */'hover_color':'#bde97a','hover_opacity':'0.85,1','hover_type':'caption'}; break;
	case 6: 
    	var skinDef={'edge_buffers':'30,30', 
			/* EVENT */'gradient_nav_color':'#FFFFFF,#FFFFFF','gradient_nav_opacity':'0.15,0.15',
			/* OVERLAY */'bg_speed':'400,600,600,4500','bg_color':'#2d2e32','bg_tile':103,'bg_tile_opacity':0.05,'bg_pic':false,'bg_pic_opacity':1,
			/* PRELOADER*/'preloader_style':7,'preloader_color':'#868992,#bbbfc8',
			/* LB & CONTENT */'lightbox_movement':'top,bottom','nav_movement':true,
			/* MATTE */'matte_color':'#393a3e','matte_size':'0,0,0,0',
			/* SLIDESHOW */'slideshow_container_color':'#bbbfc8,#868992','slideshow_counter_color':'#868992,#bbbfc8',
			/* BORDER */'border':'2,#bbbfc8', 'border_radius':'5,5,5,5',
			/* SHADOW */'drop_shadow':'0,0,10,5,#32353a,0.75',
			/* FRAME ANIMATIONS */'frame_animation':true,'frame_speed':2000,'frame_border':'2,#bbbfc8','frame_drop_shadow':'0,0,10,5,#32353a,0.75','frame_nav_override':true,
			/* NAV */'nav_buttons':'false,true,true','nav_style':'2,2,2','nav_pos':'14,14,14||14,14,14',
			'nav_buttons_offsets':'0,20||-35,20||35,20','nav_buttons_opacity':'0.75,0.75||0.15,0.9||0.15,0.75', 
			/* COUNTERS */'counter':true, 'counter_pos':'5,5', 'counter_offsets':'-12,-10','counter_control':'true, ,of',
			/* CAPTIONS */'caption_pos':'7,7','caption_offsets':'10,-10',
			/* HIGHLIGHT */'highlight_pos':'-600,1500||-600,-500','highlight_color':'#bbbfc8,#bbbfc8,#bbbfc8','highlight_opacity':'0,0.5,0',
			'highlight_size':'550%,250%','highlight_frame_opacity':'0.75,0',
			/* HOVER */'hover_color':'#393a3e','hover_opacity':'0.85,0.5','hover_style':7}; break;};


	/* SETUP SKIN CSS */
	Boxaroo.STNGS=$.extend({},Boxaroo.defaults,skinDef,options||{});
	var B=Boxaroo, skin=B.STNGS.skin, $S=$.support.bx;
	if(!$('#Skin'+skin).length)$('head').append('<link rel="stylesheet" href="Boxaroo/css/skin'+skin+'.css" type="text/css" media="all" id="Skin'+skin+'"/>');

	/* ADD REQUIRED ELEMENTS TO PAGE IF THEY DON'T EXIST */
	if(!$('#Boxaroo').length){
		$('<div id="Boxaroo"><div id="Box_O"></div><div id="Box_OT"></div><div id="Box_OP"></div><div id="Box_LB"><div id="Box_C"><div id="Box_H"><div id="Box_HInner"></div></div><div id="Box_GL"></div><div id="Box_GR"></div></div></div><div id="Box_Pre"></div><div id="Box_Cap"></div><div id="Box_Co"></div><div id="Box_SSC"><div id="Box_SST"></div></div><div id="Box_Close"><img alt="Close Boxaroo"/></div><div id="Box_Next"><img alt="Next"/></div><div id="Box_Prev"><img alt="Previous"/></div><div id="Box_Elem1"></div><div id="Box_Elem2"></div><div id="Box_Elem3"></div></div>').prependTo($('body'));
		if($S.ANI)$('<style id="Box_O_Ani"></style><style id="Box_KF"></style><style id="Box_HKF"></style><style id="Box_PreS"></style><style id="Box_M_Ani"></style>').appendTo($('head'));
		
		/* CACHE BOXAROO ELEMENTS */
		B.OBJ={
			$LB:$('#Box_LB'), $C:$('#Box_C'), $Pre:$('#Box_Pre'),
			$O:$('#Box_O'), $OT:$('#Box_OT'), $OP:$('#Box_OP'),
			$Close:$('#Box_Close'), $Next:$('#Box_Next'), $Prev:$('#Box_Prev'),
			$Co:$('#Box_Co'), $Cap:$('#Box_Cap'),
			$El1:$('#Box_Elem1'), $El2:$('#Box_Elem2'), $El3:$('#Box_Elem3'),
			$SS:$('#Box_SSC'), $SSC:$('#Box_SST'),
			$GL:$('#Box_GL'), $GR:$('#Box_GR'), 
			$High:$('#Box_H'), $HIn:$('#Box_HInner'),
			$KFCL:$('#Box_O_Ani'), $KF:$('#Box_KF'), $KFHI:$('#Box_HKF'), $KFP:$('#Box_PreS'), $KFM:$('#Box_M_Ani')}; 
		
		/* OVERLAYS MUST BE TRANSLATED BACK FOR SAFARI TO AVOID CLIPPING PROBLEMS. (BUT CAUSES PROBLEMS IN REAL BROWSERS) */
		if($S.safari||$S.msie){
			$([B.OBJ.$O[0],B.OBJ.$OT[0],B.OBJ.$OP[0]]).css('transform','translateZ(-50000px)');
			/* WORKAROUND FOR LACK OF PRESERVE-3D + 3D TRANSFORMS */ if($S.msie&&!$.support.bx.isMobile)B.OBJ.$LB.css({'position':'relative'});
		};
	};
	
	/* .EACH THUMBNAIL */
	for(var i=0, l=this.length; i<l; i++){
		/* SETUP VARS, MERGE DATA + ASSIGN DATA INFO */
		var $this=$(this[i]), alt=$this[0].getAttribute('alt'), PAR=$this.parents('a:first'), bDATA=PAR.data("boxaroo");
		$.data($this[0],$.extend({'skin':skin}, B.STNGS, !bDATA ? {} : bDATA || {} ));
		var oD=$.data($this[0]);
		/* +ALT IF MISSING (SEO/HOVER CAPTION) */
		if(alt===null || alt===undefined)$this.attr('alt',$this[0].getAttribute('title'));

		/* VALIDATE USER SETTINGS, SETUP THUMBS, HANDLE AUTO-LAUNCHING */
		B.ops($this,oD); 
		if(!$.support.bx.isTablet&&!$.support.bx.isMobile)B.thumb($this,oD); 
		if(oD.cOS)$this.click;		
	};
	
	/* THUMBNAIL CLICK EVENT */
	this.on($S.cEv,function(e){
		var bOBJ=B.OBJ, oD=$.data(this);

		/* SET CURRENT OBJ, NAVIGATION STATUS, GET VIEWPORT DIMS, STORE MOUSE POSITION FOR ORIGIN MOVEMENT */
		B.cOBJ=this; B.isNav=true; B.VwPort();
		B.mouseX=$this.position().left-$($doc).scrollLeft().pF(); 
		B.mouseY=$this.position().top-$($doc).scrollTop().pF(); 
		
		/* HIDE SCROLLBARS */
		if(!oD.SCRX)$('html')[0].style.overflowX="hidden"; 
		if(!oD.SCRY)$('html')[0].style.overflowY="hidden";	

		/* RESET LIGHTBOX */
		var Init={
			'transform':'none',
			'transition':'none',
			'box-shadow':'none',
		 	'padding':0,
		 	'border-width':0,
		 	'min-width':0,
		 	'min-height':0,
		 	'width':0,
		 	'height':0,
		 	'background':'none',
		 	'background-color':'transparent',
		 	'background-image':'none'
			};
		/* FIREFOX WORKAROUND TO AVOID PIXELATED EDGES WITH TRANSFORM ANIMATIONS */
		if($.support.bx.mozilla)Init.outline='1px solid transparent';
		B.OBJ.$LB.css(Init);

		/* LAUNCH LIGHTBOX */
		B.prep(oD); 
		B.loadC(this,false);
		B.EventsOn(this);
		e.preventDefault(); e.stopImmediatePropagation();
	});
},




// EVENTS
EventsOn:function(obj){
	var B=Boxaroo, bOBJ=B.OBJ, SW={};
	
	/* I. WINDOW RESIZE EVENT */
	$($win).on('resize',function(e){
		if(B.isNav)return;
		var bOBJ=B.OBJ, obj=B.cOBJ, oD=obj?$.data(obj):null;
		B.VwPort();

		/* SET SLIDESHOW DIMENSIONS */
		if($.support.bx.isMobile)B.sizeMobil(bOBJ);
		if(oD.ss&&oD.ss_co)bOBJ.$SS[0].style.width=B.winW+'px';

		/* SCALING */
		if(oD.scaling){
			var nD=B.LBDim(obj), 
				$content=oD.ConTYP==='image'?bOBJ.$C.find('img'):bOBJ.$C.find('iframe');
				
			/* CONTROL WHAT PROPERTIES RESIZE */
			if(nD.CS){
				var ARGS={'left':nD.L, 'top':nD.T, 'transition':'none' };
					
				if(oD.sMAT){
					ARGS['padding-top']=nD.MT; 
					ARGS['padding-right']=nD.MR; 
					ARGS['padding-bottom']=nD.MB; 
					ARGS['padding-left']=nD.ML;};
							
				if(oD.sBD_W)ARGS['border-width']=nD.BW+'px';
				if($.support.bx.SDWS&&oD.sSD)ARGS['box-shadow']=''+nD.SDWX+'px '+nD.SDWY+'px '+nD.SDWB+'px '+nD.SDWS+'px rgba('+oD.SD_C.r+','+oD.SD_C.g+','+oD.SD_C.b+','+oD.SD_OP+')';
				
				/* SIZE LIGHTBOX */
				bOBJ.$LB.css(ARGS).add($([bOBJ.$C[0],bOBJ.$High[0],$content[0]])).css({width:nD.W,height:nD.H});
					
				/* HANDLE BORDER RADIUS SCALING */
				if(oD.sBD_R&&(oD.brTL>0||oD.brTR>0||oD.brBL>0||oD.brBR>0))B.borderRAD(bOBJ,$content,nD.BRTR,nD.BRBR,nD.BRBL,nD.BRTL,nD.BW);					

				/* POSITION COMPONENTS */
				B.showComps(oD,true);
			};
		};
	});

	/* II. KEYBOARD, MOUSEWHEEL + PREVENT SCROLLING, DRAGGING AND CONTEXTMENU + FULLSCREEN VIDEO BUG */
	$($doc).on('contextmenu.Bxro, dragstart.Bxro',function(){ return false; })
	.on('keydown.Bxro',function(e){
		var key=e.which||e.keyCode, eobj=B.cOBJ, eoD=$.data(eobj), rev=eoD.nav_reverse;
		/* PREVENT PREMATURE EVENTS - PREVENT PRESSING ENTER TO NAV TO CONTENT */
		if(B.isNav||eoD.ConTYP==='flash'||!eoD.key_nav||key==13)return;
		if(key==27)B.closeLB(eobj);/* CLOSE ESC */
		if((key==39&&!eoD.NAVV)||(key==40&&eoD.NAVV))B.Nav(eobj,rev?-1:1);
		if((key==37&&!eoD.NAVV)||(key==38 && eoD.NAVV))B.Nav(eobj,rev?1:-1);

	}).on('mousewheel.Bxro DOMMouseScroll.Bxro',function(e){
		var eoD=$.data(B.cOBJ);
		if(eoD.MSWHL&&!B.isNav){
			var DIR=(e.type=='DOMMouseScroll')?e.originalEvent.detail:e.originalEvent.wheelDelta, rev=eoD.nav_reverse;
			if(DIR===-3||DIR===120){ B.Nav(B.cOBJ,rev?-1:1); }else{ B.Nav(B.cOBJ,rev?1:-1); };
		};
		return false;
	})
	/* PRESERVE-3D BUG WITH HTML5 VIDEO PLAYER (HIDES VIDEO IN FULL SCREEN) */
	.on('webkitfullscreenchange mozfullscreenchange ofullscreenchange fullscreenchange',function(e){
		/* MUST CHANGE THE TRANSFORM STYLE ON LB, CONTENT AND IFRAME */
		var bOBJ=Boxaroo.OBJ, FSArgs={}, d=document, PRE=$.support.bx.PRE,
			objs=$([bOBJ.$LB[0],bOBJ.$C[0],$('#Box_IFrame')[0]]);
		/* ENTERING FULL SCREEN */
		if(d.mozFullScreenElement||d.webkitFullScreenElement||d.msFullscreenElement||d.fullscreenElement||d.oFullscreenElement){
			FSArgs[PRE+'transform-style']='flat';
			objs.css(FSArgs);			
		/* EXIT FULL SCREEN */
		}else{
			FSArgs[PRE+'transform-style']='preserve-3d';
			$($win).resize();
		};
	});
	/* DISABLE DOUBLE-TAP AND PINCH/ZOOM */
	if($.support.bx.isTablet||$.support.bx.isMobile)$('#Boxaroo').on('touchstart',function(e){ e.preventDefault(); });

	/* III. NAVIGATION BUTTONS */
	$([bOBJ.$Prev[0],bOBJ.$Next[0],bOBJ.$Close[0]]).on('mouseover',function(){ 
		var obj=$(this), oD=$.data(B.cOBJ);
		switch(obj[0]){
			case bOBJ.$Prev[0]: var OI=oD.p_opI, d=oD.p_hI, SI=oD.p_sclI, RI=oD.p_RI, FX=oD.p_FXI, FY=oD.p_FYI;
				B.jsHook(oD.js_prev_hover); break;
			case bOBJ.$Next[0]: var OI=oD.n_opI, d=oD.n_hI, SI=oD.n_sclI, RI=oD.n_RI, FX=oD.n_FXI, FY=oD.n_FYI;
				B.jsHook(oD.js_next_hover); break;
			case bOBJ.$Close[0]: var OI=oD.c_opI, d=oD.c_hI, SI=oD.c_sclI, RI=oD.c_RI, FX=oD.c_FXI,FY=oD.c_FYI;
				B.jsHook(oD.js_close_hover); break;
		};
		var Args={'opacity':OI};
		Args[$.support.bx.PRE+'transform']=B.clcTR(1000,SI,SI,0,0,FX,FY,0,0,RI);					
		obj.Ani(Args,d,null);			
	}).on('mouseout',function(){ 
		if(!B.isNav){
			var obj=$(this), oD=$.data(B.cOBJ);
			switch(obj[0]){
				case bOBJ.$Prev[0]: var OO=oD.p_opO, d=oD.p_hO, SO=oD.p_sclO, RO=oD.p_RO, FX=oD.p_FXO, FY=oD.p_FYO; break;
				case bOBJ.$Next[0]: var OO=oD.n_opO, d=oD.n_hO, SO=oD.n_sclO, RO=oD.n_RO, FX=oD.n_FXO, FY=oD.n_FYO; break;
				case bOBJ.$Close[0]: var OO=oD.c_opO, d=oD.c_hO, SO=oD.c_sclO, RO=oD.c_RO, FX=oD.c_FXO, FY=oD.c_FYO; break;
			};
			var Args={'opacity':OO};
			Args[$.support.bx.PRE+'transform']=B.clcTR(1000,SO,SO,0,0,FX,FY,0,0,RO);
			obj.Ani(Args,d,null);			
		};
	});
	bOBJ.$Prev.on($.support.bx.cEv,function(){ if(!B.isNav)B.Nav(B.cOBJ,$.data(B.cOBJ).nav_reverse?1:-1); });
	bOBJ.$Next.on($.support.bx.cEv,function(){ if(!B.isNav)B.Nav(B.cOBJ,$.data(B.cOBJ).nav_reverse?-1:1); });
	bOBJ.$Close.on($.support.bx.cEv,function(){ if(!B.isNav)B.closeLB(B.cOBJ); });
	
	/* IV. OVERLAYS */
	$([bOBJ.$O[0],bOBJ.$OT[0],bOBJ.$OP[0]]).on($.support.bx.cEv,function(){
		if(!B.isNav&&$.data(B.cOBJ).o_clse)B.closeLB(B.cOBJ);
	});

	/* V. SPECIAL VIDEO EVENTS */
	if($win.addEventListener){$win.addEventListener('message',B.onMessageReceived,false);
	}else{$win.attachEvent('onmessage',B.onMessageReceived,false);};

	/* VI. GRADIENT NAV + SWIPING (DELEGATED) */
	bOBJ.$LB.on('mousedown mousemove mouseup mouseover mouseout touchstart touchmove touchend '+$.support.bx.cEv,bOBJ,function(e){
		var evT=e.type, eobj=B.cOBJ, eoD=$.data(eobj), oE=e.originalEvent, rev=eoD.nav_reverse;

		// SWIPE MUST BE COMBINED WITH GRADIENT NAV CLICK (SINCE MOUSEDOWN/MOVE/UP CONSTITUTES A CLICK AND WILL FIRE MUTLIPLTE TIMES */
		if(e.target===bOBJ.$GL[0] || e.target===bOBJ.$GR[0] && !eoD.FULL){
			var evX=oE.clientX!==undefined?oE.clientX:oE.pageX, evY=oE.clientY!==undefined?oE.clientY:oE.pageY,
				dis=eoD.vm_distance, thd=eoD.vm_axis_threshold, vert=eoD.NAVV;

			/* PREVENT MIDDLE/RIGHT MOUSE BUTTON INTERACTION */
			if(e.which===2 || e.which===3)return false;
	
			/* SWIPING COORDINATES */
			if(evT==='mousedown'||evT==='touchstart'){
				SW.sX=evX; SW.sY=evY;
			}else if(evT==='mousemove'||evT==='touchmove'){
				SW.eX=evX; SW.eY=evY;
				e.preventDefault(); /* PREVENT TOUCHCANCEL */
			}else if(evT==='mouseup'||evT==='touchend'){
				
				if(B.isNav)return;	
				/* eX=ENDX, dX=DIFFX, sX=STARTX, LX=LARGEX, SX=SMALLX */
				SW.LX=SW.eX>SW.sX?SW.eX:SW.sX; SW.LY=SW.eY>SW.sY?SW.eY:SW.sY;
				SW.SX=SW.eX<SW.sX?SW.eX:SW.sX; SW.SY=SW.eY<SW.sY?SW.eY:SW.sY;
				SW.dX=SW.LX-SW.SX; SW.dY=SW.LY-SW.SY;					
				var HSW=SW.dX>dis&&SW.dY<thd&&!vert, VSW=SW.dY>dis&&SW.dX<thd&&vert;
				
				/* SWIPING */
				if((eoD.VMSE||eoD.TOUCH)&&(HSW||VSW)){
					if(HSW)if(SW.LX===SW.eX){ B.Nav(eobj,rev?1:-1); }else{ B.Nav(eobj,(rev)?-1:1); };
					if(VSW)if(SW.LY===SW.eY){ B.Nav(eobj,rev?1:-1); }else{ B.Nav(eobj,rev?-1:1); };

				/* RESET SWIPE OBJECT */
				SW.eX=SW.eY=SW.dX=SW.dY=0;
				
				/* CLICKING GRADIENT NAV */
				}else if(eoD.GN){
					if(e.target===bOBJ.$GL[0] && bOBJ.$GL.css('opacity').pF()>0){ B.Nav(B.cOBJ,rev?1:-1);
					}else if(e.target===bOBJ.$GR[0]&&bOBJ.$GR.css('opacity').pF()>0){ B.Nav(B.cOBJ,rev?-1:1); };
				};
			};
		};
		
		/* GRADIENT NAV HOVER EVENTS */
		if(evT==='mouseover' && !$.support.bx.isTablet){
			switch(e.target){
				case bOBJ.$GL[0]: 
					var eoD=$.data(B.cOBJ);
					if(eoD.GN && !eoD.FULL && eoD.GALS[$.inArray(B.cOBJ,eoD.GALS)-1]!==undefined){
						bOBJ.$GL.stop(true,false).fadeTo(eoD.LS,eoD.LO);
					}else{
						bOBJ.$GL[0].style.cursor="default";
					};
				break;
				case bOBJ.$GR[0]:
					var eoD=$.data(B.cOBJ);
					if(eoD.GN&&!eoD.FULL&&eoD.GALS[$.inArray(B.cOBJ,eoD.GALS)+1]!==undefined){
						bOBJ.$GR.stop(true,false).fadeTo(eoD.RS,eoD.RO);
					}else{
						bOBJ.$GR[0].style.cursor="default";
					};
				break;
			};
			
		}else if(evT==='mouseout' && !$.support.bx.isTablet){
			switch(e.target){
				case bOBJ.$GL[0]:
					var eoD=$.data(B.cOBJ);
				if(eoD.GN)bOBJ.$GL.fadeTo(eoD.LS,0);
				break;
			case bOBJ.$GR[0]:
				var eoD=$.data(B.cOBJ);
				if(eoD.GN)bOBJ.$GR.fadeTo(eoD.RS,0);
			break;
		};
	};
	e.preventDefault(); e.stopImmediatePropagation();
});
},





//////// THUMBNAIL METHODS 
thumb:function(obj,oD){
	/* USE BOXAROO HOVER */	
	if(!oD.altH){
		/* SETUP HOVER ELEMENTS */
		var hoCl=(oD.hover_class)?oD.hover_class:"Box_Hov_"+oD.skin;
		obj.wrap('<div class="Box_Hov"/>').parent('div.Box_Hov')
			.prepend('<div class="Box_HovL '+hoCl+'"/><div class="Box_HovL1"/>');
		var $HO=!oD.hTAR ? obj.parents('div.Box_Hov') : $('.'+oD.hTAR.replace('.',' ')+':first'), 
			$WRAP=obj.parents('div.Box_Hov'), 
			$Hov1=$WRAP.find('div.Box_HovL'), 
			$Hov2=$WRAP.find('div.Box_HovL1'),
			IN={}, OUT={};
		
		switch(oD.hov){
			case 'icon':			
				/* INSERT ICON, CACHE AND SAVE DIMENSIONS (MUST USE ONLOAD EVENT SINCE WEBKIT DOESN'T USE TIMERS) */
				var $IconImg=new Image(), src='Boxaroo/images/Hovers/'+oD.h_sty+'.png';
				$IconImg.onload=function(){
					$Hov2.html('<div class="Box_Ico Box_Ico_'+oD.skin+'"><img src="'+src+'"/></div>');
					var $Icon=$Hov2.find('div.Box_Ico img');
					obj.data({ TW : $Icon.outerWidth(true), TH : $Icon.outerHeight(true) });
				}; 
				$IconImg.src=src;
			break;
			case 'caption':
				var CC=(oD.hover_text_class)?oD.hover_text_class:'Box_HovTxt_'+oD.skin;
				$Hov2.html('<p class="'+CC+'" >'+oD.s_cap+'</p>'); 
			break;
		};
		
		/* CLICK EVENT */
		$HO.on($.support.bx.cEv,function(e){			
			obj.click(); 
			this.style.zIndex='auto'; 
			e.preventDefault(); e.stopImmediatePropagation();
		})

		/* HOVER EVENT */
		.parents('a:first').on({'mouseenter':function(){
			/* GET DIMENSIONS IN CASE THEY'VE CHANGED */
			var W=obj.outerWidth(true), H=obj.outerHeight(true), H1S=$Hov1[0].style, H2S=$Hov2[0].style;
			H1S.width=W+'px';
			H1S.height=H+'px';
			H2S.width=W+'px';
			H2S.height=H+'px';
						
			/* ICON */
			switch (oD.hov){
				case 'icon':	
					if(oD.TW==undefined)return;
					var newW=W*oD.IC_S, 
						newH=oD.TH > oD.TW ? Math.round(oD.TW/oD.TH*newW) : Math.round(oD.TH/oD.TW*newW)||0,
						mL=(W-newW)/2+'px', mT=(H-newH)/2+'px';
					/* SET DIMENSIONS + POSITION */
					$Hov2.find('div.Box_Ico').css({'width':newW+'px','height':newH+'px','margin-left':mL,'margin-top':mT}).find('img').css({'width':newW+'px','height':newH});
				break;
				
				case 'caption':
					var HClass=(oD.hover_text_class)?oD.hover_text_class:'Box_HovTxt_'+oD.skin,				
						elH=$Hov2.find('p.'+HClass).outerHeight(true), pT=(H-elH)/2+'px';
					$Hov2.css('padding-top',pT);
				break;	
			};

			/* ANIMATE COLOR LAYER */
			$Hov1.css({'background-color':(oD.hCLR)?oD.hCLR:'none'}).Ani({'opacity':oD.h_op1},oD.hC_spI,null);
			
			/* ANIMATE ELEMENT LAYER */
			if(oD.hov)$Hov2.Ani({'opacity':oD.h_op2},oD.h_spI,null);

			/* USING .STOP() IN .Ani CAUSES SPIRAL CONFLICTS, MUST USE IT HERE FOR FAST THUMBNAIL HOVERS */
			if(!$.support.bx.TRNS){$([$Hov1[0],$Hov2[0]]).stop(true,true); return;};

			IN[$.support.bx.PRE+'transform']=Boxaroo.clcTR(oD.h_per,oD.h_sclX,oD.h_sclY,oD.h_trX,oD.h_trY,oD.h_FX,oD.h_FY,oD.h_KX,oD.h_KY,oD.h_RO);
			$HO.css('z-index',!oD.hTAR?'auto':'999999999999').Ani(IN,oD.hTAR_spI,null);
		}})		
		
		/* MOUSE LEAVE */
		.on('mouseleave',function(){
			/* THUMB COLOR LAYER */
			if(oD.hCLR)$Hov1.Ani({'opacity':0},oD.hC_spO,null);
			$Hov2.Ani({'opacity':0},oD.h_spO,null);

			/* USING .STOP() IN .Ani CAUSES SPIRAL CONFLICTS, MUST USE IT HERE FOR FAST THUMBNAIL HOVERS */
			if(!$.support.bx.TRNS){ $([$Hov1[0],$Hov2[0]]).stop(true,true); return; };
			OUT[$.support.bx.PRE+'transform']='none';

			$HO.css('z-index','auto').Ani(OUT,oD.hTAR_spO,null);
		});
	};
},




//////// OVERLAY METHODS 
Overlays:function(obj,Nav){
	var oD=$.data(obj), bOBJ=Boxaroo.OBJ,
		$O=bOBJ.$O, $T=bOBJ.$OT, $P=bOBJ.$OP,
		tile=oD.bg_tile>0?'url(Boxaroo/images/Tiles/bg_'+oD.bg_tile+'.png)':'none', 
		pic=oD.bg_pic,
		PRE=$.support.bx.PRE,
		speed=(Nav)?oD.bg_spN:oD.bg_spI,
		cur=(oD.o_clse)?'pointer':'default',
		CLArgs={'text-indent':$O.css('text-indent').pF()+1,'opacity':oD.bg_op,'background-color':oD.bgclrs[0]};
	/* SETUP ANIMATION ARGS */
	CLArgs[PRE+'animation']='none';	
			

	/* IF THERE IS A BACKGROUND IMAGE - ALL LAYERS MUST APPEAR AT THE SAME TIME, LOAD BACKGROUND FIRST */
	if(oD.bg_pic!==false){
		var img=new Image(), 
			src=pic===true?oD.SRC:!isNaN(pic)?'Boxaroo/images/Backgrounds/bg_'+pic+'.jpg':pic;
		img.onload=function(){
			var BA={'text-indent':$P.css('text-indent').pF()+1},
				p=$P[0].style;

			if(Nav){
				/* BACKGROUND LAYER */				
				BA.opacity=0;
				$P.Ani(BA,200,function(){
					p.backgroundImage='url('+src+')';
					p.visibility='visible';
					p.cursor=cur;
					$P.Ani({'opacity':oD.p_op},(Nav)?speed/2:speed,null);
				}); 
				
				/* TILE LAYER */
				$T.Ani({'text-indent':$T.css('text-indent').pF()+1,'opacity':0},speed,function(){
					if(Nav)$T.Ani({'opacity':oD.t_op},speed,null)[0].style.background=tile;
				});
				
			}else{
				/* BACKGROUND LAYER */										
				p.backgroundImage='url('+src+')';
				p.visibility='visible';
				p.cursor=cur;
				$P.Ani({'opacity':oD.p_op},(Nav)?speed/2:speed,null);

				/* TILE LAYER */				
				var t=$T[0].style;
				t.background=tile;
				t.visibility='visible';
				t.cursor=cur;
				$T.Ani({'opacity':oD.t_op},speed,null);		
			};
			
			/* COLOR LAYER */
			Boxaroo.colorLayer($O,cur,CLArgs,speed,oD);
		}; img.src=src;

	/* NO BACKGROUND LAYER */
	}else{
		/* TILE LAYER */	
		if(Nav){
			$T.Ani({'text-indent':$T.css('text-indent').pF()+1,'opacity':0},speed,function(){
				if(Nav)$T.Ani({'opacity':oD.t_op},speed,null)[0].style.background=tile;
			});
		}else{
			var t=$T[0].style;
			t.background=tile;
			t.visibility='visible';
			t.cursor=cur;
			$T.Ani({'opacity':oD.t_op},speed,null);		
		};
		
		/* COLOR LAYER */
		Boxaroo.colorLayer($O,cur,CLArgs,speed,oD);
		/* HIDE EXISTING BACKGROUND LAYER */
		$P.Ani({'opacity':0},speed,null);
	};

	/* FIXED POSITION BUG ON OLDER MOBILES, MAKE OVERLAYS MATCH SCREEN+BUFFER */
	if($.support.bx.isMobile)Boxaroo.sizeMobil(bOBJ);
},	


colorLayer:function($O,cur,CLArgs,speed,oD){
	var bOBJ=Boxaroo.OBJ, PRE=$.support.bx.PRE;
	$O[0].style.visibility='visible';
	$O[0].style.cursor=cur;
	$O.PSE().Ani(CLArgs,speed,function(){
	/* COLOR ANIMATION LOOP */
	if($.support.bx.ANI && oD.bgclrs.length > 1){
		var BA=oD.bgclrs, OC=BA.length, CArr=[];
		for(var i=OC; i>0; i--)CArr.push(100/OC*(i-1)+'% {background-color:'+BA[i-1]+';}'); 
		CArr.unshift('100% {background-color:'+BA[0]+';}');
		var CStr=CArr.reverse().join(' ').toString();
		CA={'transition':'none'}; CA[PRE+'animation']='BCL '+oD.bg_spA+'s 0s infinite';
		/* UPDATE AND APPLY KEYFRAMES */
		bOBJ.$KFCL.html('@'+PRE+'keyframes BCL{'+CStr+'}'); 
		$O.css(CA).PLY();
	/* JUST APPLY A SINGLE COLOR */
	}else{ $O[0].style.backgroundColor=oD.bgclrs[0]; };
	});	
},

sizeMobil:function(bOBJ){
	$('#Boxaroo')[0].style.top=$($win).scrollTop()+'px';
	$([bOBJ.$O[0],bOBJ.$OT[0],bOBJ.$OP[0]]).css({'width':Boxaroo.winW+5,'height':Boxaroo.winH+5});	
},

borderRAD:function(bOBJ,$content,brTR,brBR,brBL,brTL,BD_W){
	$([bOBJ.$High[0],bOBJ.$LB[0],bOBJ.$GL[0],bOBJ.$C[0],$content[0]])
		.css({'display':'block','border-top-left-radius':brTL-BD_W<0?0:brTL-BD_W+'px','border-bottom-left-radius':brBL-BD_W<0?0:brBL-BD_W+'px'});
	$([bOBJ.$High[0],bOBJ.$LB[0],bOBJ.$GR[0],bOBJ.$C[0],$content[0]])
		.css({'display':'block','border-top-right-radius':brTR-BD_W<0?0:brTR-BD_W+'px','border-bottom-right-radius':brBR-BD_W<0?0:brBR-BD_W+'px'});
},







// LIGHTBOX METHODS
sizeLB:function(obj,Nav){
	var oD=$.data(obj), B=Boxaroo, bOBJ=B.OBJ,
		$content=oD.ConTYP==='image' ? bOBJ.$C.find('img') : bOBJ.$C.find('iframe'),
		nD=B.LBDim(obj), sF=B.scF,
		r=Math.round, m=Math.max,
		winW=B.winW, winH=B.winH,
		PRE=$.support.bx.PRE,
		/* INITIAL CSS OBJECT */
		init={
			'transition':'none',
			'min-width':'0px',
			'min-height':'0px',
			'background-color':oD.mclrs[0]},	
		/* ANIMATION ARGUMENTS OBJECT */
		ani={
			'background-color':oD.mclrs[0],
			'width':nD.W,
			'height':nD.H,
			'left':nD.L,
			'top':nD.T,
			'border-width':r(oD.BD_W*sF)+'px',
			'border-color':oD.BD_C,
			'border-top-left-radius':r(oD.brTL*sF)+'px',
			'border-top-right-radius':r(oD.brTR*sF)+'px',
			'border-bottom-left-radius':r(oD.brBL*sF)+'px',
			'border-bottom-right-radius':r(oD.brBR*sF)+'px',
			'padding-top':nD.MT+'px',
			'padding-right':nD.MR+'px',
			'padding-left':nD.ML+'px',
			'padding-bottom':nD.MT+'px'};
	/* SETUP SCALING MARKER, ANIMATE OVERLAYS */
	B.iniW=nD.W.pF()*16;
	B.Overlays(obj,Nav);
	
	/* GET CURRENT TRANSFORMATIONS */
	if( !Nav || !oD.FRAME || (Nav&&oD.F_OVRD) )ani[PRE+'transform']=B.getTR(oD,Nav);

	/* DROP SHADOW ANIMATION */
	if($.support.bx.SDWS){
		var BXS=r(oD.SD_X*sF)+'px '+r(oD.SD_Y*sF)+'px '+r(oD.SD_B*sF)+'px '+r(oD.SD_SP*sF)+'px rgba('+oD.SD_C.r+','+oD.SD_C.g+','+oD.SD_C.b+','+oD.SD_OP+')';
		ani['box-shadow']=BXS;		
	};

	/* MATTE COLOR ANIMATION */
	if($.support.bx.ANI && oD.mclrs.length>1){
		/* BUILD MATTE KEYFRAME ANIMATION STRING */
		var MA=oD.mclrs, Colors=MA.length, MArr=[], MArgs={};
		for(var i=Colors; i>0; i--)MArr.push(100/Colors*(i-1)+'% {background-color:'+MA[i-1]+';}'); 
		MArr.unshift('100% {background-color:'+MA[0]+'}');
		var MStr=MArr.reverse().join(' ').toString(), 		
			MAni='@'+PRE+'keyframes Matte_Color{'+MStr+'}',
			multi='MCOLO '+oD.mc_sp+'s 0s infinite';
		if(oD.FRAME)oD.multiMatte=multi;		
		/* LBs WITH FRAME_ANIMATIONS AND MATTE COLOR ANIMATIONS NEED TO USE , SEPARATED CSS */
		//!!! 3d flipping demo wasn't animating matte color and flip simulatenously, used to read:
		//	var CL='.MANI{'+PRE+'animation:'+multi+';}@'+PRE+'keyframes MCOLO{'+MStr+'}}';
		var CL='@'+PRE+'keyframes MCOLO{'+MStr+'}}';
		bOBJ.$KFM.html(CL);
		bOBJ.$LB.PLY().addClass(' MANI');		
	}else if(Nav){
		bOBJ.$LB.removeClass('MANI')[0].style.backgroundColor=oD.mclrs[0];
	};

	/* INTIAL OPEN */
	if(!Nav){
		if(oD.FRAME&&oD.F_OVRD)B.FAnim(obj,oD);
		var pos=B.LBMov(oD,'enter',nD);
		/* SETUP INTIAL CSS OBJECT */
		init['border-color']=oD.BD_C;
		init.top=pos.top+'px';
		init.left=pos.left+'px';
		init.width=oD.lbI==='shrink'?winW:'0px';
		init.height=oD.lbI==='shrink'?winH:'0px';
		init['background-color']=oD.mclrs[0];
		init['box-shadow']=BXS;
		if(oD.lbI==='match'){ init.width=nD.W; init.height=nD.H; };
		if(oD.mBG)init['background-image']='url(Boxaroo/images/Tiles/bg_'+oD.mBG+'.png)';		
		/* APPLY INITIAL CSS VALUES */
		bOBJ.$LB.css(init);

	/* NAVIGATION */
	}else{
		/* FRAME ANIMATION */
		if(oD.FRAME&&!oD.F_OVRD)B.FAnim(obj,oD);
		/* NAV SPIRAL ANIMATION */
		if(oD.spl_N)B.Spiral(oD,oD.spl_spN);
		/* IE<9 WON'T ANIMATE SHADOWS WITHOUT ADDITIONAL HEAVY CODE */
		if($.support.bx.msie&&$.support.bx.v<=9)bOBJ.$LB.css('box-shadow',BXS);
		/* MATTE BACKGROUND */
		bOBJ.$LB[0].style.backgroundImage=(oD.mBG)?'url(Boxaroo/images/Tiles/bg_'+oD.mBG+'.png)':'none';
	};

	/* HIGHLIGHT ANIMATION */
	if(oD.HI){ 
		/* SETUP HIGHLIGHT CSS */
		var H=bOBJ.$HIn[0].style, c1=B.H2R(oD.hiC1), c2=B.H2R(oD.hiC2), c3=B.H2R(oD.hiC3);
		/* SAFARI=BEHIND THE TIMES (webkit) */
		H.backgroundImage='-webkit-radial-gradient(farthest-side '+oD.HI+' at center center, rgba('+c1.r+','+c1.g+','+c1.b+','+oD.hiOp1+') '+oD.hiS1+'%, rgba('+c2.r+','+c2.g+','+c2.b+','+oD.hiOp2+') '+oD.hiS2+'%, rgba('+c3.r+','+c3.g+','+c3.b+','+oD.hiOp3+') '+oD.hiS3+'%)';
		H.backgroundImage='radial-gradient(farthest-side '+oD.HI+' at center center, rgba('+c1.r+','+c1.g+','+c1.b+','+oD.hiOp1+') '+oD.hiS1+'%, rgba('+c2.r+','+c2.g+','+c2.b+','+oD.hiOp2+') '+oD.hiS2+'%, rgba('+c3.r+','+c3.g+','+c3.b+','+oD.hiOp3+') '+oD.hiS3+'%)';
		H.width=oD.hiW+'%'; 
		H.height=oD.hiH+'%'; 
		H.backgroundPosition=oD.hiXI+'px '+oD.hiYI+'px';
		if(Nav || !Nav&&!oD.FRAME)B.HIAni(obj,oD); 
	};
	
	/* HANDLE GRADIENT NAV EVENTS */
	if(oD.GN){ 
		var lC=oD.GNLC, rC=oD.GNRC, GL=bOBJ.$GL[0].style, GR=bOBJ.$GR[0].style,
			GR1='linear-gradient(to right,'+lC+' 0%,rgba(255,255,255,0) 100%)',
			GR2='linear-gradient(to left,'+rC+' 0%,rgba(255,255,255,0) 100%)';
		GL.opacity=0; GR.opacity=0;
		GL.cursor='pointer'; GR.cursor='pointer';
		GL.borderTopLeftRadius='0px';  GL.borderBottomLeftRadius='0px';
		GR.borderTopRightRadius='0px'; GR.borderBottomRightRadius='0px';
		GL.background=PRE+GR1;
		GL.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr="'+lC+'", endColorstr="#00FFFFFF", GradientType=1)';
		GL.background=GR1;
		GR.background=PRE+GR2;
		GR.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr="#00FFFFFF", endColorstr="'+rC+'", GradientType=1)';
		GR.background=GR2;
	}else{ 
		bOBJ.$GR[0].style.opacity=0; bOBJ.$GL[0].style.opacity=0;
	};


	/* ANIMATE LB IN */
	bOBJ.$LB.css({'visibility':oD.FULL?'hidden':'visible','border-color':oD.BD_C})
		.Ani({'opacity':(!Nav||bOBJ.$LB.css('opacity').pF()!==1)?1:0.99},Nav?100:oD.b_spI,function(){
				
		/* APPLY SPIRAL ANIMATION */
		if(!Nav && oD.sprl)B.Spiral(oD,oD.spl_spI);
		
		/* WEBKIT HAS A FUNKY 3D TRANSFORM BUG (WILL RUN THE TRANSFORM ANIMATION TWICE (MUST REMOVE ONE) */
		delete ani['-webkit-transform'];

		/* ANIMATE LB DIMENSIONS + POSITION */
		bOBJ.$LB.Ani(ani,Nav?oD.b_spN:oD.b_spI,function(){

			/* SET DIMENSIONS + MIN DIMENSIONS ON CONTENT */
			$([bOBJ.$C[0],$content[0],bOBJ.$LB[0]]).css({
				'transition':'none',
				'min-width':nD.minW,
				'min-height':nD.minH,
				'width':nD.W,
				'height':nD.H});
			
			/* APPLY BORDERS TO CONTENT	+ GRADIENT NAVS + HIGHLIGHTS */
			B.borderRAD(bOBJ,$content,oD.brTR,oD.brBR,oD.brBL,oD.brTL,oD.BD_W);

			/* SYNC HIGHLIGHT */
			bOBJ.$High[0].style.width=nD.W;
			bOBJ.$High[0].style.height=nD.H;
						
			/* SET VIDEO/FLASH TO BLOCK (KEEPS ELEMENTS FROM VISIBLY BEING INSERTED INTO THE LB) */
			if(!$.support.bx.isTablet){
				if(oD.ConTYP==='video'){ $('#Box_IFrame')[0].style.display='block';
				}else if(oD.ConTYP==='flash'&&$.support.bx.safari){
					/* SAFARI SCROLLING BUG ISSUES SWF FILES */
					$win.scrollTo(0,0);	
				};				
			};
			
			/* ANIMATE CONTENT IN */
			bOBJ.$C[0].style.visibility=!oD.FULL?'visible':'hidden';
			
			/* SHOW COMPONENTS */
			B.showComps(oD,false);
			
			
			bOBJ.$C.Ani({'opacity':1},!Nav?oD.c_spI:oD.c_spN,function(){ 

					/* LAUNCH FRAME ANIMATION */
					if(oD.FRAME && (!Nav||Nav&&oD.F_OVRD)){ 
						B.FAnim(obj,oD); 
						/* SYNC HIGHLIGHT */
						if(oD.HI)B.HIAni(obj,oD);
					};
					
					/* INITIATE SLIDESHOW */
					if(oD.ss){
						var time=m(oD.slide_display_time,m(m(oD.bg_spN,oD.bg_spI)));
						B.SSTime=setTimeout(function(){ B.Nav(obj,1); },time);
					
						/* SETUP SLIDESHOW COUNTER */
						if(oD.ss_co){
							/* NOT USING ANIMATOR TO AVOID CONDITION IN ANIMATOR FUNCTION FOR COUNTER EASING */
							if($.support.bx.TRNS){
								bOBJ.$SSC.css({
									'background-color':oD.ssc_clrI,
									'margin-left':oD.slideshow_counter_direction===1?winW+'px':-winW+'px',
									'transition':'opacity, margin-left '+time/1000+'s linear 0s'});
								bOBJ.$SS.css({
									'background-color':oD.sc_clrO,
									'transition':'background-color '+time/1000+'s linear 0s'});									
							}else{
								bOBJ.$SSC.Ani({'background-color':oD.ssc_clrO,'margin-left':oD.slideshow_counter_direction===1?winW:-winW},time,null);
								bOBJ.$SS.Ani({'background-color':oD.sc_clrO},time,null);
							};
						};
					};	
					
					/* JS_OPEN HOOK, HIDE PRELOADER, SET NAVIGATION INDICATOR */
					if(!Nav){ B.jsHook(oD.js_open); }else{ B.jsHook(oD.js_open_nav); };
					B.hidePre(obj,oD); 
					B.isNav=false;	
					
					/* AFTER CONTENT IS DONE ANIMATING, PRELOAD PREVIOUS AND NEXT IMAGES */
					var numofImages=oD.GALS.length,
						index=$.inArray(obj,oD.GALS)+1;

					if(numofImages>1){
						var prevImg=oD.GALS[index-2],
							nextImg=oD.GALS[index];
					
						/* PREVIOUS IMAGE */
						if(index>=2 && !prevImg.cached && $.data(prevImg).ConTYP==='image'){
							var pImg=new Image();
							pImg.src=$.data(prevImg).SRC;
							pImg.onload=function(){ prevImg.cached=true; };
						};					
					
						/* NEXT IMAGE */
						if(index<=numofImages-1 && !nextImg.cached && $.data(nextImg).ConTYP==='image'){
							var nImg=new Image();
							nImg.src=$.data(nextImg).SRC;
							nImg.onload=function(){ nextImg.cached=true; };
						};
					};
				});
			});
		});
	
	/* SLIDESHOW COUNTER SETUP */
	if(oD.ss_co&&oD.ss){
		bOBJ.$SSC.css({'transition':'none','background-color':oD.ssc_clrI,'margin-left':'0px'});
		bOBJ.$SS.css({'visibility':'visible','width':winW}).Ani({'background-color':oD.sc_clrI,'opacity':1},500,null);
	};
},



/* MAIN NAVIGATION METHOD */
Nav:function(obj,DIR){
	if(Boxaroo.isNav)return;
	var B=Boxaroo,
		bOBJ=B.OBJ,
		oD=$.data(obj),
		$Nxt=oD.GALS[$.inArray(obj,oD.GALS)+DIR],
		winW=B.winW,
		winH=B.winH,
		PRE=$.support.bx.PRE,
		$LB=bOBJ.$LB,
		$C=bOBJ.$C;

	/* IF CAN NAVIGATE */
	if($Nxt!==undefined){
		/* INDICATE NAVIGATION, SET MARKERS */ 
		B.isNav=true; B.cOBJ=$Nxt; B.pOBJ=obj; 
		var NoD=$.data($Nxt),
			s=oD.b_spN,
			Ns=NoD.b_spN;

		/* HIDE COMPONENTS + STOP HIGHLIGHTS */
		B.hideComps(oD);		
		bOBJ.$HIn.PSE().removeClass('BoxHA');
		bOBJ.$HIn[0].style.opacity=0;
		
		/* JS_NAVIGATE LIGHTBOX HOOKS */
		B.jsHook(oD.js_navigate); if(DIR===1)B.jsHook(oD.js_nav_fwd); if(DIR===-1)B.jsHook(oD.js_nav_back);

		/* NO ERROR */
		if(!$('#Box_Error').length){
			var pos=B.LBMov(oD,'exit',true),
				lbO=oD.lbO;
				width=(lbO!=='match')?lbO==='shrink'?'0px':winW+'px':$LB.outerWidth(), 
				height=(lbO!=='match')?lbO==='shrink'?'0px':winH+'px':$LB.outerHeight(),
				oldIE=$.support.bx.msie&&$.support.bx.v==8.0,
				NavFlip=oD.F_OVRD&&(NoD.FX===NoD.F_FX&&NoD.FX!==0)||(NoD.FY===NoD.F_FY&&NoD.FY!==0)||(NoD.KX===NoD.F_KX&&NoD.KX!==0)||(NoD.KY===NoD.F_KY&&NoD.KY!==0)||(NoD.rot===NoD.F_R&&NoD.rot!==0)||(NoD.trX===NoD.F_trX&&NoD.trX!==0)||(NoD.trY===NoD.F_trY&&NoD.trY!==0),
				NA={'left':pos.left+'px', 'top':pos.top+'px',
					'width':width, 'height':height, 'min-width':width, 'min-height':height,
					'border-width':'0px', 'border-color':NoD.BD_C,
					'padding-top':'0px', 'padding-left':'0px', 'padding-bottom':'0px', 'padding-right':'0px',
					'background-image':'none'};				
				
			/* SAVE MOUSE COORDINATES (ORIGIN) */
			if(NoD.lbI==='origin' || NoD.lbO==='origin'){ B.mouseX=$Nxt.postion().left; B.mouseY=$Nxt.position().top; };

			/* I. LB MOVEMENT NAV */
			if(oD.nav_movement || NoD.nav_movement){
				/* IE8 BUG */if(oldIE)$C[0].style.visibility='hidden';

				/* ANIMATE CONTENT OUT */				
				$C.Ani({'opacity':0},oD.c_spN,function(){
					/* TRANSFORMS (TEST FRAME_NAV_OVERRIDE - ALLOWS ANI DURING NAV W/O TRANSFORMS) (NAVFLIP OR RESET TRANSFORMS) */
					NA[PRE+'transform']=(NavFlip)?B.NavFlip(obj,oD,NoD):B.getTR(NoD,false);

					/* ANIMATE THE LIGHTBOX OUT */
					$LB.PSE().Ani(NA,s,function(){
						/* DISABLE FRAME ANIMATIONS, REMOVE ELEMENTS, STACK, CLASSES */
						$LB.PSE().removeClass('BoxAniC');
						B.remEls(bOBJ); B.prep(NoD); 
							
						/* LB MOVEMENT + EFFECT */
						var nP=B.LBMov(NoD,'enter',true),
							EA={'top':nP.top+'px', 'left':nP.left+'px',
								'min-width':0, 'min-height':0,
								'visibility':!NoD.FULL?'visible':'hidden'};

						/* LB DIMENSIONS IF NOT MATCHING */
						if(NoD.lbI!=='match'){
							EA.width=NoD.lbI==='shrink'?winW+'px':'0px';
							EA.height=NoD.lbI==='shrink'?winH+'px':'0px';
						};
							
						/* APPLY CSS, LOAD CONTENT (ALLOW FADE FROM FULL_SIZE -> LIGHTBOX) */
						$LB.css(EA); 
						if(!oD.FULL){ B.loadC($Nxt,true);
						}else if(!NoD.FULL){ B.FadBIn(bOBJ,Ns,$Nxt); };
					});
				});

			/* II. STANDARD LB FADE NAV */
			}else{	
				/* ANIMATE CONTENT OUT */
				$C.Ani({'opacity':0},oD.c_spN,function(){
					B.remEls(bOBJ);

					if(!NoD.FULL){
						/* FRAME ANIMATIONS - GET TRANSFORM, PAUSE LB */
						if(oD.FRAME){
							var LBArgs={};
							NA[PRE+'transform']=B.getTR(NoD,false);
							LBArgs[PRE+'filter']='none';
							$LB.css(LBArgs).PSE().removeClass('BoxAniC');
						};
		
						/* TRANSFORMS (TEST FRAME_NAV_OVERRIDE - ALLOWS ANI DURING NAV W/O TRANSFORMS) + REMOVE SOME NAV ARGS */
						if(NavFlip){
							NA[PRE+'transform']=B.NavFlip(obj,oD,NoD);
							delete NA.width; delete NA.height; delete NA['min-width']; delete NA['min-height']; delete NA['top']; delete NA['left']; };

						/* ANIMATE LB */
						$LB.Ani(NA,oD.FRAME?300:s,function(){							
							/* CLASSES, STACK, LOAD CONTENT (ALLOW FOR FADE BACK FROM FULL_SIZE MODE) */
							B.prep(NoD); 
							if(!oD.FULL){ B.loadC($Nxt,true);
							}else if(!NoD.FULL){ B.FadBIn(bOBJ,Ns,$Nxt); };
						});						
	
	
					/* NEXT IS FULL_SIZE, FADE OUT LB */
					}else{
						$LB.Ani({'opacity':0},s,function(){
							/* PAUSE LB, CLASSES, STACK, LOAD CONTENT */
							bOBJ.$LB[0].style.transition='none';
							bOBJ.$LB[0].style.visibility='hidden';
							bOBJ.$LB.PSE().removeClass('BoxAniC');
							B.prep(NoD); B.loadC($Nxt,true);
						});
					};
				});			
			};	
		
		/* ERROR NAV */
		}else{
			/* PAUSE HIGHLIGHTS, CLASSES, STACK, REMOVE ELS, LOAD CONTENT */
			bOBJ.$HIn.PSE().removeClass('BoxHA');
			B.prep(NoD); B.remEls(bOBJ); B.loadC($Nxt,false);
		};
		
	/* CAN'T NAVIGATE */
	}else{
		B.isNav=false;
		if(oD.ss){
			/* HANDLE SLIDESHOWS */
			if(oD.close_at_end){
				B.closeLB(obj);
				B.jsHook(oD.js_slideshow_end);
			};
			if(oD.ss_co)bOBJ.$SS[0].style.visibility="hidden";
		};
	};
},



/* FADE LB IN AFTER FULL_SIZE */
FadBIn:function(bOBJ,s,o){
	bOBJ.$LB.css({'visibility':'visible','opacity':0}).stop(true,true).animate({'opacity':1},{duration:s,queue:false,complete:function(){
		Boxaroo.loadC(o,true);
	}});
},





/* LIGHTBOX SIZING METHOD */
LBDim:function(obj){
	/* CS=CAN SCALE, */	
	var	B=Boxaroo, bOBJ=B.OBJ, oD=$.data(obj), $LB=bOBJ.$LB,
		winW=B.winW, winH=B.winH,
		a=Math.abs, r=Math.round,
		/* BORDER WIDTH / CURRENT BORDER WIDTH */
		b_W=oD.BD_W,
		cBorderW=$LB[0].style.borderWidth.pF(),
		/* MATTES */
		oDMT=oD.MATt, oDMR=oD.MATr, oDMB=oD.MATb, oDML=oD.MATl,
		ConW=B.conW, ConH=B.conH,
		TOPB=r(winH*(oD.bY/100)+(b_W*2)+oDMT+oDMB),
		LEFTB=r(winW*(oD.bX/100)+(b_W*2)+oDML+oDMR),
		sB=oD.sBD_R, sS=oD.sSD,
		oldIE=$.support.bx.msie&&$.support.bx.v<9;
		/* CURRENT BORDER RADIUS */
		if(!oldIE){
			var cbrTL=(oD.brTL>0)?$LB.css('border-top-left-radius').pF():0,
				cbrTR=(oD.brTR>0)?$LB.css('border-top-right-radius').pF():0,
				cbrBL=(oD.brBL>0)?$LB.css('border-bottom-left-radius').pF():0,
				cbrBR=(oD.brBR>0)?$LB.css('border-bottom-right-radius').pF():0;
		};

	/* SETUP BOX SHADOWS */
	if($.support.bx.SDWS)var cSDW=$.trim($LB.css('box-shadow').replace(/rgba?\([^\)]+\)/gi, '').replace(/#[0-9a-f]+/gi, '').replace(/[a-z]+/gi, '')).split(' ');

	/* SIZE THE LB BASED ON LONGEST SIDE */
	switch(ConW>ConH?ConW:ConH){
		case ConW:
			var boxH=winH-TOPB<ConH ? winH-TOPB : ConH,
				boxW=r(boxH*ConW/ConH),
				Min_W=r(ConW*oD.mH/ConH),
				Min_H=oD.mH;
			if(winW < boxW+LEFTB)var boxW=winW-LEFTB < ConW ? winW-LEFTB : ConW, boxH=r(boxW*ConH/ConW);
		break;
		case ConH:
			var boxW=winW-LEFTB < ConW ? winW-LEFTB : ConW,
				boxH=r(boxW*ConH/ConW),
				Min_H=r(oD.mW*ConH/ConW),
				Min_W=oD.mW;
			if(winH < boxH+TOPB)var boxH=winH-TOPB < ConH ? winH-TOPB : ConH, boxW=r(boxH*ConW/ConH);
		break;
	};
	
	var FAC=B.iniW===0 ? boxW : B.iniW,
		CS=(boxW>oD.mW && boxH>oD.mH && boxW/FAC>0.05 && boxH/FAC>0.05) ? true : false,
		sF=B.scF,
		newBW=oD.sBD_W&&CS ? a(r(sF*b_W)) : cBorderW,
		brTL=sB&&CS ? a(r(sF*oD.brTL)) : cbrTL,
		brTR=sB&&CS ? a(r(sF*oD.brTR)) : cbrTR,
		brBL=sB&&CS ? a(r(sF*oD.brBL)) : cbrBL,
		brBR=sB&&CS ? a(r(sF*oD.brBR)) : cbrBR,
		m_T=CS ? a(r(sF*oDMT)) : oDMT+'px',
		m_R=CS ? a(r(sF*oDMR)) : oDMR+'px',
		m_B=CS ? a(r(sF*oDMB)) : oDMB+'px',
		m_L=CS ? a(r(sF*oDML)) : oDML+'px';

	return {
		CS:CS,
		MT:m_T, MR:m_R, MB:m_B, ML:m_L,
		L:(winW-(boxW+m_L+m_R))/2-b_W+'px',
		T:(winH-(boxH+m_T+m_B))/2-b_W+'px',
		W:boxW/16+'em', H:boxH/16+'em',
		minW:Min_W/16+'em', minH:Min_H/16+'em',
		BW:newBW>b_W?b_W:newBW,
		BRTL:brTL>5?brTL:5, BRTR:brTR>5?brTR:5, BRBL:brBL>5?brBL:5, BRBR:brBR>5?brBR:5,
		SDWX:sS&&CS?a(r(sF*oD.SD_X)):cSDW[0], SDWY:sS&&CS?a(r(sF*oD.SD_Y)):cSDW[1], SDWB:sS&&CS?a(r(sF*oD.SD_B)):cSDW[2], SDWS:sS&&CS?a(r(sF*oD.SD_SP)):cSDW[3]};
},




/* LIGHTBOX MOVEMENT EFFECTS (v=EVENT, GI=GROW IN, SO=SHRINK OUT, MI=MATCH IN, ETC) */
LBMov:function(oD,v,nD){
	var	B=Boxaroo, W=B.winW, H=B.winH, I=oD.lbI, O=oD.lbO,
		X=nD!==true?(nD.W.pF()*16)+oD.trX:B.OBJ.$LB.outerWidth()+oD.trX,
		Y=nD!==true?(nD.H.pF()*16)+oD.trY:B.OBJ.$LB.outerHeight()+oD.trY,
		e='enter', ex='exit', m='match', s='shrink', g='grow', ENT=v===e, EXT=v===ex, 
		GI=I===g&&ENT, SI=I===s&&ENT, MI=I===m&&ENT, GO=O===g&&EXT, SO=O===s&&EXT, MO=O===m&&EXT,
		a=GI||SO, b=SI||GO, c=MI||MO;
	
	switch(v==e?oD.ent : oD.exit){
		case 'center':
			if(a)var sT=H/2,sL=W/2;
			if(b)var sT=0,sL=0;
			if(c)var sT=(H-Y)/2,sL=(W-X)/2;
		break; 
		case 'topleft':
			if(a)var sT=-Y,sL=-X/2;
			if(b||c)var sT=-Y,sL=-X;
		break; 
		case 'top':
			if(a)var sT=-Y,sL=W/2;
			if(b)var sT=-Y,sL=0;
			if(c)var sT=-Y,sL=(W-X)/2;
		break; 
		case 'topright':
			if(a)var sT=-Y/2,sL=W+X/2;
			if(b||c)var sT=-Y,sL=W-X/2;
		break; 
		case 'right':
			if(a)var sT=H/2,sL=W+X;
			if(b||c)var sT=(H-Y)/2,sL=W+X/2;
		break;
		case 'bottomright':
			if(a)var sT=H+Y,sL=W+X;
			if(b||c)var sT=H+Y,sL=W+X/2;
		break;
		case 'bottom':
			if(a)var sT=H+Y,sL=W/2;
			if(b)var sT=H+Y,sL=0;
			if(c)var sT=H+Y,sL=(W-X)/2;
		break;
		case 'bottomleft':
			if(a)var sT=H+Y,sL=0-X;
			if(b||c)var sT=H+Y,sL=-X*2;
		break; 
		case 'left':
			if(a)var sT=H/2,sL=-X;
			if(b||c)var sT=(H-Y)/2,sL=-X*2;
		break;
		case 'origin':
			if(a)var sT=B.mouseY,sL=B.mouseX;
			if(b||c)var sT=(H-Y)/2,sL=0-X*2;
		break;
	};		
	return {'top':sT,'left':sL};
},




/* CLOSE LIGHTBOX */
closeLB:function(obj){
	/* SET isNav TO TRUE TEMPORILY TO PREVENT USERS FROM NAVIGATING WHILE THE LIGTHBOX IS CLOSING */
	Boxaroo.isNav=true;
	var B=Boxaroo, D=$.data(obj), O=B.OBJ,
		winW=B.winW, winH=B.winH,
		pos=B.LBMov(D,'exit',true);
	
	/* HIDE PRELOADER, UNBIND EVENTS, CLEAR SLIDESHOWS */
	B.hidePre(obj,D); 
	$($doc).off('keydown.Bxro mousewheel.Bxro DOMMouseScroll.Bxro contextmenu.Bxro, dragstart.Bxro');
	if(D.ss)O.$SS[0].style.visibility="hidden"; 
	clearTimeout(B.SSTime);
	clearTimeout(B.orientTime);	
		
	/* IF LIGHTBOX IS VISIBLE */
	if(!$('#Box_Error').length){
		B.hideComps(D);
		/* SPIRAL EXIT, HIDE COMPONENTS */
		if(D.spl_EX)B.Spiral(D,D.spl_sO);

		/* ANIMATE CONTENT OUT */
		O.$C.Ani({'opacity':0},D.c_spO,function(){
			/* RESET HIGHLIGHTS */
			O.$C[0].style.visibility="hidden"; 			
			O.$HIn.PSE().removeClass('BoxHA');

			/* PRE-ANIMATION SETUP */
			var A={'opacity':0,
				   'top':pos.top+'px', 
				   'left':pos.left+'px',
				   'min-width':'0px',
				   'min-height':'0px',
				   'border-width':'0px'};
			if(D.lbO!=='match'){ A.width=D.lbO==="shrink"?'0px':winW; A.height=D.lbO==="shrink"?'0px':winH; };

			/* ANIMATE LB OUT */
			O.$LB[0].style.transition='none';
			O.$LB.Ani(A,D.b_spO,function(){
				O.$LB[0].style.visibility='hidden';
				O.$LB.removeClass('BoxAniC');
				$([O.$LB[0],O.$HIn[0]]).PSE(); 
				O.$HIn[0].style.opacity=0;

				/* SHOW SCROLLBARS, REMOVE ELEMENTS, JS_CLOSE HOOK */
				if(!D.SCRX)$('html')[0].style.overflowX="auto";
				if(!D.SCRY)$('html')[0].style.overflowY="auto";				
				Boxaroo.remEls(O);
				if(!D.js_slideshow_end)B.jsHook(D.js_close);
				
				/* ANIMATE OVERLAYS OUT */
				$([O.$O[0],O.$OT[0],O.$OP[0]]).PSE().Ani({'text-indent':O.$O.css('text-indent').pF()+1,'opacity':0},D.bg_spO,
					function(){ 
						O.$O[0].style.visibility='hidden';
						O.$OT[0].style.visibility='hidden';
						O.$OP[0].style.visibility='hidden';
					});
				});
		});
	}else{/* ERROR IS VISIBLE */
		$('#Box_Error').Ani({'opacity':0},D.b_spO,function(){
			/* REMOVE ELEMENTS, HIDE OVERLAYS, SHOW SCROLLBARS */
			B.remEls(O);
			$([O.$O[0],O.$OT[0],O.$OP[0]]).css('visibility','hidden');
			if(!D.SCRX)$('html')[0].style.overflowX="auto";
			if(!D.SCRY)$('html')[0].style.overflowY="auto";
		});
	};		
},






// COMPONENT METHODS 
/* SHOW HELPER - C=COMPONENT, PI=POSITION INFO, O=OPACITY, S=SPEED, A=ARGS, RZ=RESIZE */
CIn:function(c,A,CSS,PI,p,X,Y,O,S,m_p,RZ,m_X,m_Y,m_s){
	c.css(A).pos(PI,p,X,Y,c.outerWidth(true),c.outerHeight(true),false);
	if(!RZ)c.css(CSS).Ani({'opacity':O},S,null);
	/* MOVE */
	if(p!==m_p&&!RZ)c.pos(PI,m_p,m_X,m_Y,c.outerWidth(true),c.outerHeight(true),m_s);
},

/* APPEND HTML ELEMENT CONTENT */
addEL:function(el,src,hook){
	src[0].style.display="block";
	el.html(src.clone(true))[0].style.visibility='visible';
	el.off($.support.bx.cEv);
	src[0].style.display='none';
	/* JS_EL1_CLICK HOOK */
	if(typeof $win[hook]==='function')el.on($.support.bx.cEv,function(){ $win[hook].apply(Boxaroo.OBJ); });
},

/* HIDE HELPER C=COMPONENT, S=SPEED */
HC:function(c,s,el){
	c.Ani({'opacity':0},s,function(){
		c[0].style.visibility='hidden'; 
		if(el)c.html(' ');
	});
},

/* HIDE */
hideComps:function(D){		
	var B=Boxaroo, BO=B.OBJ, s=D.b_spN;
	if(D.ss)B.HC(BO.$SS,200,false);
	if(D.p_btn)B.HC(BO.$Prev,s/2,false);
	if(D.n_btn)B.HC(BO.$Next,s/2,false);
	if(D.c_btn)B.HC(BO.$Close,s/2,false);
	if(D.el1)B.HC(BO.$El1,D.el1_spO,true);
	if(D.el2)B.HC(BO.$El2,D.el2_spO,true);
	if(D.el3)B.HC(BO.$El3,D.el3_spO,true);
	if(D.counter)B.HC(BO.$Co,D.co_spO,false);
	if(D.caption)B.HC(BO.$Cap,D.cap_spO,false);
},

/* SHOW COMPONENTS Z=RESIZE */
showComps:function(oD,Z){
	var B=Boxaroo, bOBJ=B.OBJ, obj=B.cOBJ, $LB=bOBJ.$LB,
		SP=oD.btn_spI,
		GAL=oD.GALS,
		PI={wW:B.winW, wH:B.winH,
			_H:$LB.outerHeight(), 
			_W:$LB.outerWidth(),
			sW:(oD.SCRY)?20:0,
			_T:Math.round($LB.position().top), 
			_L:Math.round($LB.position().left)},
		dir='Boxaroo/images/Nav/',
		elA={'display':'block','transition':'none'},
		CCA={'visibility':'visible','transition':'none'};
			
	/* SET SCROLL POSITIONS, TRACK ELEMENT SCALING - FIX IPAD ORIENTATION BUG */ 
	B.scrollX=$($win).scrollLeft(); 
	B.scrollY=$($win).scrollTop();
	this.scF=sF=PI.wW*PI.wH/B.iniArea;
	
	if(oD.c_btn){
		/* SET IMAGE */
		if(!Z)bOBJ.$Close.find('img')[0].src=dir+'close_'+oD.c_sty+'.png';
		var CS=sF>oD.c_mx?oD.c_mx:sF<oD.c_mn?oD.c_mn:sF;
		B.CIn(bOBJ.$Close,{'width':oD.iniCW*CS+'px','height':oD.iniCH*CS+'px'},{'transition':'none','visibility':'visible','transform':(!Z)?B.clcTR(oD.per,oD.c_sclO,oD.c_sclO,0,0,oD.c_FXO,oD.c_FYO,0,0,oD.c_RO):'none'},
		PI,Z?oD.c_p_m:oD.c_p,Z?oD.c_m_X:oD.c_X,Z?oD.c_m_Y:oD.c_Y,oD.c_opO,SP,oD.c_p_m,Z,oD.c_m_X,oD.c_m_Y,oD.c_m_sp); };

	if(oD.p_btn){
		if(!Z)bOBJ.$Prev.find('img')[0].src=dir+'prev_'+oD.p_sty+'.png';
		var PS=sF>oD.p_mx?oD.p_mx:sF<oD.p_mn?oD.p_mn:sF;
		B.CIn(bOBJ.$Prev,{'width':oD.iniPW*PS+'px','height':oD.iniPH*PS+'px'},
		{'transition':'none','visibility':(!GAL[$.inArray(obj,GAL)-1])?'hidden':'visible','transform':(!Z)?B.clcTR(oD.per,oD.p_sclO,oD.p_sclO,0,0,oD.p_FXO,oD.p_FYO,0,0,oD.p_RO):'none'},
		PI,Z?oD.p_p_m:oD.p_p,Z?oD.p_m_X:oD.p_X,Z?oD.p_m_Y:oD.p_Y,oD.p_opO,SP,oD.p_p_m,Z,oD.p_m_X,oD.p_m_Y,oD.p_m_sp); };

	if(oD.n_btn){
		if(!Z)bOBJ.$Next.find('img')[0].src=dir+'next_'+oD.n_sty+'.png';
		var NS=sF>oD.n_mx?oD.n_mx:sF<oD.n_mn?oD.n_mn:sF;
		B.CIn(bOBJ.$Next,{'width':oD.iniNW*NS+'px','height':oD.iniNH*NS+'px'},
		{'transition':'none','visibility':(!GAL[$.inArray(obj,GAL)+1])?'hidden':'visible','transform':(!Z)?B.clcTR(oD.per,oD.n_sclO,oD.n_sclO,0,0,oD.n_FXO,oD.n_FYO,0,0,oD.n_RO):'none'},PI,Z?oD.n_p_m:oD.n_p,Z?oD.n_m_X:oD.n_X,Z?oD.n_m_Y:oD.n_Y,oD.n_opO,SP,oD.n_p_m,Z,oD.n_m_X,oD.n_m_Y,oD.n_m_sp); };

	if(oD.el1){
		if(!Z)B.addEL(bOBJ.$El1,$(oD.el1),oD.js_el1_click);
		B.CIn(bOBJ.$El1,{'font-size':(sF*100>oD.el1_mx?oD.el1_mx:sF*100<oD.el1_mn?oD.el1_mn:sF*100)+'%'},elA,PI,Z?oD.el1_p_m:oD.el1_p,Z?oD.el1_m_X:oD.el1_X,Z?oD.el1_m_Y:oD.el1_Y,oD.el1_op,oD.el1_spI,oD.el1_p_m,Z,oD.el1_m_X,oD.el1_m_Y,oD.el1_m_sp); };

	if(oD.el2){
		if(!Z)B.addEL(bOBJ.$El2,$(oD.el2),oD.js_el2_click);
		B.CIn(bOBJ.$El2,{'font-size':(sF*100>oD.el2_mx?oD.el2_mx:sF*100<oD.el2_mn?oD.el2_mn:sF*100)+'%'},
		elA,PI,Z?oD.el2_p_m:oD.el2_p,Z?oD.el2_m_X:oD.el2_X,Z?oD.el2_m_Y:oD.el2_Y,oD.el2_op,oD.el2_spI,oD.el2_p_m,Z,oD.el2_m_X,oD.el2_m_Y,oD.el2_m_sp); };

	if(oD.el3){
		if(!Z)B.addEL(bOBJ.$El3,$(oD.el3),oD.js_el3_click);
		B.CIn(bOBJ.$El3,{'font-size':(sF*100>oD.el3_mx?oD.el3_mx:sF*100<oD.el3_mn?oD.el3_mn:sF*100)+'%'},
		elA,PI,Z?oD.el3_p_m:oD.el3_p,Z?oD.el3_m_X:oD.el3_X,Z?oD.el3_m_Y:oD.el3_Y,oD.el3_op,oD.el3_spI,oD.el3_p_m,Z,oD.el3_m_X,oD.el3_m_Y,oD.el3_m_sp); };

	if(oD.counter){
		if(!Z)bOBJ.$Co[0].innerHTML='<p>'+oD.co_key+' '+($.inArray(obj,GAL)+1)+(oD.co_sfx?' '+oD.co_word+' '+GAL.length:'')+'</p>'; 
		B.CIn(bOBJ.$Co,{'font-size':(sF*100>oD.co_mx?oD.co_mx:sF*100<oD.co_mn?oD.co_mn:sF*100)+'%'},
		CCA,PI,Z?oD.co_p_m:oD.co_p,Z?oD.co_m_X:oD.co_X,Z?oD.co_m_Y:oD.co_Y,1,oD.co_spI,oD.co_p_m,Z,oD.co_m_X,oD.co_m_Y,oD.co_m_sp); };
	
	if(oD.caption){
		if(!Z)bOBJ.$Cap[0].innerHTML=(oD.cap_G) ? '<p><span class="Caption">'+oD.l_cap+'</span><span class="GalleryName">'+(oD.cap_G?$(obj).attr('rel'):'')+'</span></p>' : '<p><span class="Caption">'+oD.l_cap+'</span></p>';
		B.CIn(bOBJ.$Cap,{'font-size':(sF*100>oD.cap_mx?oD.cap_mx:sF*100<oD.cap_mn?oD.cap_mn:sF*100)+'%',
		'width':oD.cap_FW?(oD.cap_p>=18?B.winW:$LB.width()):'auto'},
		CCA,PI,Z?oD.cap_p_m:oD.cap_p,Z?oD.cap_m_X:oD.cap_X,Z?oD.cap_m_Y:oD.cap_Y,1,oD.cap_spI,oD.cap_p_m,Z,oD.cap_m_X,oD.cap_m_Y,oD.cap_m_sp); };
},


/* REMOVE ELEMENTS */
remEls:function(B){
	var rem=[];
	if($.support.bx.ANI)$([B.$KF[0],B.$KFHI[0],B.$KFP[0],B.$KFM[0],B.$KFCL[0]]).html(' ');
	if(B.$C.find('img').length)rem.push(B.$C.find('img')[0]);
	if($('#Box_Flash').length)rem.push($('#Box_Flash')[0]);
	if($('#Box_IFrame').length)rem.push($('#Box_IFrame')[0]);
	if($('#Box_Error').length)rem.push($('#Box_Error')[0]);
	$(rem).remove();
},

/* ASSIGN CLASSES AND SETUP STACKING, D=OBJECT DATA */
prep:function(D){
	var O=Boxaroo.OBJ, s=D.skin,
		CCO=D.counter_class, CCA=D.caption_class,
		CE1=D.el1_class, CE2=D.el2_class, CE3=D.el3_class,
		CC=D.close_button_class, CP=D.prev_button_class, CN=D.next_button_class,	
		z=D.stack_order.removeWS().toLowerCase().split(','), l=z.length;

	/* CUSTOM STACKING ORDER + DYNAMIC CLASS ASSIGNMENT */
	if(l<12)alert("Boxaroo: Missing Stacking Values.");
	for(var i=0; i<l; ++i){
		switch (z[i]){
			case 'overlay': O.$O[0].style.zIndex=99100+i; break;
			case 'tile': O.$OT[0].style.zIndex=99100+i; break;
			case 'bg_image': O.$OP[0].style.zIndex=99100+i; break;
			case 'lightbox': $([O.$LB[0],O.$C[0],$('#Box_Error')[0]]).css('z-index',99100+i); break;
			case 'el1': if(D.el1){ O.$El1[0].className=(CE1?CE1:'Box_Elem1_'+s); O.$El1[0].style.zIndex=99100+i; }; break;
			case 'el2': if(D.el2){ O.$El2[0].className=(CE2?CE2:'Box_Elem2_'+s); O.$El2[0].style.zIndex=99100+i; }; break;
			case 'el3': if(D.el3){ O.$El3[0].className=(CE3?CE3:'Box_Elem3_'+s); O.$El3[0].style.zIndex=99100+i; }; break;
			case 'counter': if(D.counter){ O.$Co[0].className=(CCO?CCO:'Box_Co_'+s); O.$Co[0].style.zIndex=99100+i; }; break;
			case 'caption': if(D.caption){ O.$Cap[0].className=(CCA?CCA:'Box_Caption_'+s); O.$Cap[0].style.zIndex=99100+i; }; break;
			case 'next_button': if(D.n_btn){ O.$Next[0].className=(CN?CN:'Box_Next_'+s); O.$Next[0].style.zIndex=99100+i; }; break;
			case 'prev_button': if(D.p_btn){ O.$Prev[0].className=(CP?CP:'Box_Previous_'+s); O.$Prev[0].style.zIndex=99100+i; }; break;
			case 'close_button': if(D.c_btn){ O.$Close[0].className=(CC?CC:'Box_Cl_'+s); O.$Close[0].style.zIndex=99100+i; }; break;
		};
	};
	/* REMAINING CLASS ASSIGNMENT AND STACKING ORDER */
	O.$LB[0].className=(O.$LB.hasClass('BoxAniC'))?'BoxAniC Box_LB_'+s:'Box_LB_'+s;
	O.$C[0].className='Box_Content '+D.content_class;
	if(D.GN){ O.$GR[0].style.zIndex=991700; O.$GL[0].style.zIndex=991700; };
	if(D.HI)O.$High[0].style.zIndex=991500;
},




// CONTENT METHODS 
loadC:function(obj,Nav){
	var oD=$.data(obj),
		B=Boxaroo, bOBJ=B.OBJ; 
	B.showPre(obj,oD);
	
	switch(oD.ConTYP){
		/* IMAGES */
		case 'image': var img=new Image();
			img.onload=function(){
				/* SAVE DIMENSIONS, SET SOURCE/ALT ATTR, SIZE LIGHTBOX */
				B.conW=this.width*oD.szX; 
				B.conH=this.height*oD.szY; 
				oD.cached=true; 
				bOBJ.$C.append('<img alt="'+obj.getAttribute('title')+'" src="'+oD.SRC+'"/>');
				B.sizeLB(obj,Nav); 
			};
			img.onerror=function(){ B.Error(obj); };
			img.src=oD.SRC; 
		break;
		
		/* VIDEOS FROM VIMEO */
		case 'video': 
				var w=oD.vW, h=oD.vH, 
					aPlay=(oD.aPlay)?'1':'0',
					loop=(oD.loop)?'1':'0',
					clr=(oD.vColor)?oD.vColor:'00adef';
				bOBJ.$C.prepend('<iframe id="Box_IFrame" src="//player.vimeo.com/video/'+oD.ConSRC+'?api=1&player_id=Box_IFrame&portrait=0&byline=0&color='+clr+'&autoplay='+aPlay+'&loop='+loop+'" width="'+w+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				B.conW=w; B.conH=h;
				Boxaroo.sizeLB(obj,Nav);
		break;
		
		/* FLASH SWF */
		case 'flash':
			if(!$.support.bx.isTablet){
				var src=oD.SRC;
				/* PHP TO PULL DIMENSIONS OF SWF FILE */
				$.ajax({
					url:'Boxaroo/video/swf_prop.php?src='+src,dataType:'json',
					success:function(response){
						bOBJ.$C.prepend('<object id="Box_Flash" type="application/x-shockwave-flash" data="'+src+'" width="100%" height="100%" style="display:none;"><param name="allowfullscreen" value="false"/><param name="wmode" value="opaque"/><param name="quality" value="autohigh"/><param name="allowscriptaccess" value="always"/><param name="flashvars" value="file='+src+'"/><!--[if IE]><!--><param name="movie" value="'+src+'"/><!--<![endif]--></object>'); 
						B.conW=response.size[0]; B.conH=response.size[1]; 
						B.sizeLB(obj,Nav);
				}});
			}else{
				oD.error_text="This device does not support Flash."; 
				B.Error(obj);
			};
		break;
	};	
},

/* VIDEO POSTMESSAGE (HANDLE MESSAGES FROM VIMEO PLAYER) */
onMessageReceived:function(e){
	var data=JSON.parse(e.data), B=Boxaroo, obj=B.cOBJ, d=$.data(obj), ADV=d.autoADV;
	if(!ADV)return;		
	switch(data.event){
		case 'ready': 
			var value='playProgress',
				data={method:'addEventListener'},
				f=$('#Box_IFrame'),
				url='http:'+f.attr('src').split('?')[0];
			if(value)data.value=value;
			f[0].contentWindow.postMessage(JSON.stringify(data),url);			
		break;
        case 'playProgress': 
			if(data.data.percent===1&&!B.isNav&&ADV)B.Nav(obj,d.nav_reverse?-1:1)
		break;
	};
},

/* ANIMATION METHODS */
FAnim:function(obj,D){
	var B=Boxaroo, bOBJ=B.OBJ,
		pre=$.support.bx.PRE,
		TRI=pre+'transform:'+B.clcTR(D.per,D.sclX,D.sclY,D.trX,D.trY,D.FX,D.FY,D.KX,D.KY,D.rot)+';',
		TRO=pre+'transform:'+B.clcTR(D.F_P,D.F_sclX,D.F_sclY,D.F_trX,D.F_trY,D.F_FX,D.F_FY,D.F_KX,D.F_KY,D.F_R)+';',
		BXI='box-shadow:'+D.SD_X+'px '+D.SD_Y+'px '+D.SD_B+'px '+D.SD_SP+'px rgba('+D.SD_C.r+','+D.SD_C.g+','+D.SD_C.b+','+D.SD_OP+');',
		BXO='box-shadow:'+D.F_SD_X+'px '+D.F_SD_Y+'px '+D.F_SD_B+'px '+D.F_SD_SP+'px rgba('+D.F_SD_C.r+','+D.F_SD_C.g+','+D.F_SD_C.b+','+D.F_SD_OP+');',
		BCI='border-color:'+D.BD_C+';',
		BCO='border-color:'+D.F_BC_C+';',
		BWI='border-width:'+D.BD_W+'px;',
		BWO='border-width:'+D.F_BD_W+'px;',
		multi='frame '+D.frame_speed/1000+'s 0s '+D.frame_count+' '+D.frame_direction+' forwards ease-in-out';
	/* HANDLE MULTIPLE CSS ANIMATIONS ON THE SAME ELEMENT (MATTE COLOR ANIMATION + FRAME ANIMATION) */
	if(D.multiMatte!==null && D.multiMatte!==undefined)var multi=multi+','+D.multiMatte;
	
	/* SETUP CSS IMAGE FILTERS */
	if($.support.bx.Filters){
		var gr=D.GRY, blr=D.blr, sep=D.SEP, con=D.CTR, br=D.BRI,
			gIn=gr!==D.F_GRY?'grayscale('+gr+'%)':'',
			gOut=gr!==D.F_GRY?'grayscale('+D.F_GRY+'%)':'',
			bIn=blr!==D.F_BLR?'blur('+blr+'px)':'',
			bOut=blr!==D.F_BLR?'blur('+D.F_BLR+'px)':'',
			sIn=sep!==D.F_SEP?'sepia('+sep+'%)':'',
			sOut=sep!==D.F_SEP?'sepia('+D.F_SEP+'%)':'',
			conIn=con!==D.F_CON?'contrast('+con+'%)':'',
			conOut=con!==D.F_CON?'contrast('+D.F_CON+'%)':'',
			brIn=br!==D.F_BRI?'brightness('+br+'%)':'',
			brOut=br!==D.F_BRI?'brightness('+D.F_BRI+'%)':'',
			satIn=D.SAT!==D.F_SAT?'saturate('+D.SAT+'%)':'',
			satOut=D.SAT!==D.F_SAT?'saturate('+D.F_SAT+'%)':'',
			hueRIn=D.HUE!==D.F_HUE?'hue-rotate('+D.HUE+'deg)':'',
			hueROut=D.HUE!==D.F_HUE?'hue-rotate('+D.F_HUE+'deg)':'',
			AIN=[], AO=[];

		/* BUILD FILTERS KEYFRAME STRING + SETUP FILTER OBJECT */
		if(gIn!==''&&gOut!==''){ AIN.push(gIn); AO.push(gOut); };
		if(bIn!==''&&bOut!==''){ AIN.push(bIn); AO.push(bOut); };
		if(sIn!==''&&sOut!==''){ AIN.push(sIn); AO.push(sOut); };
		if(conIn!==''&&conOut!==''){ AIN.push(conIn); AO.push(conOut); };
		if(brIn!==''&&brOut!==''){ AIN.push(brIn); AO.push(brOut); };
		if(satIn!==''&&satOut!==''){ AIN.push(satIn); AO.push(satOut); };
		if(hueRIn!==''&&hueROut!==''){ AIN.push(hueRIn); AO.push(hueROut); };
		var FIL={In:pre+'filter:'+AIN.join(' ')+';',
			 	 Out:pre+'filter:'+AO.join(' ')+';'};
		FIL.stat=!$.support.bx.Filters||FIL.In===FIL.Out?false:true;
	};

	/* SETUP FRAME ANIMATION STRING + UPDATE THE STYLE ELEMENT */		
	var from=(FIL!==undefined&&FIL.stat?FIL.In:'')+(TRI!==TRO?TRI:'')+(BCI!==BCO?BCI:'')+(BWI!==BWO?BWI:'')+(BXI!==BXO&&$.support.bx.SDWS?BXI:''),
		to=(FIL!==undefined&&FIL.stat?FIL.Out:'')+(TRI!==TRO?TRO:'')+(BCI!==BCO?BCO:'')+(BWI!==BWO?BWO:'')+(BXI!==BXO&&$.support.bx.SDWS?BXO:'');
	bOBJ.$LB.PSE();
	if(from!==to){
		/* SETUP KEYFRAME STRING AND UPDATE */
		//!!!
		
		bOBJ.$KF.html('.BoxAniC{transition:none;'+pre+'animation:'+multi+';}'+'@'+pre+'keyframes frame {from{'+from+'}to{'+to+'}}'); 
		bOBJ.$LB.PLY()[0].className+=' BoxAniC';
	};
},

/* MAIN HIGHLIGHT METHOD */
HIAni:function(obj,D){
	/* COMPUTE NEW HIGHLIGHT POSITION BASED ON TRANSFORM ANIMATIONS, D=OBJECT DATA */
	var B=Boxaroo.OBJ, FX=D.FX, FY=D.FY, FFX=D.F_FX, FFY=D.F_FY, HXO=D.hiXO, HXI=D.hiXI, HYO=D.hiYO, HYI=D.hiYI,
		/* TRANSFORMATION COMPENSATION USE FALSE FOR 2ND VALUES OF HIGHLIGHT_POS TO COMPENSATE FOR 3D FLIPS */
		GX=(FY!==FFY&&!HXO)?(FY>FFY?FY:FFY)-(FY<FFY?FY:FFY):!HXO&&HXI!==HXO?HXI:HXO, 
		GY=(FX!==FFX&&!HYO)?(FX>FFX?FX:FFX)-(FX<FFX?FX:FFX):!HYO&&HYI!==HYO?HYI:HYO, 
		P=$.support.bx.PRE, BP='background-position:', O='opacity:';
	B.$KFHI.html('.BoxHA{'+P+'animation:Grad '+D.hi_sp/1000+'s '+D.frame_direction+' '+D.frame_count+';} @'+P+'keyframes Grad{from{'+BP+HXI+'px '+HYI+'px;'+O+D.F_hi_opI+';}to{'+BP+GX+'px '+GY+'px;'+O+D.F_hi_opO+';}}');
	B.$HIn.PLY()[0].className+=' BoxHA';
},

/* SPIRAL ANIMATIONS */
Spiral:function(D,sS){
	/* IE7 DOESN'T SUPPORT SPIRALS */if($.support.bx.msie&&$.support.bx.v<8)return;
	/* sV=SPIRALVERTICAL, sR=SPIRALRADIUS, sRV=SPIRALREVERSE, sC=SPIRALCYCLES, sS=SPIRALSPEED, sl/st=START LEFT/TOP, D=OBJECT DATA */
	var $LB=Boxaroo.OBJ.$LB,
		sV=D.spl_v,
		sR=D.spl_R,
		sRV=D.spl_RV,
		sC=D.spl_C,
		sl=sV?sR-20:sR,
		st=sV?-20:0;
	$LB.animate({'text-indent':9999999999103},{duration:sS,step:function(now,fx){
		var fg=sRV?sR*(1+fx.pos):sR*(1-fx.pos),
			g=fx.pos*sC*Math.PI,
			x=sl-sR+fg*Math.cos(g)+'px',
			y=st+fg*Math.sin(g)+'px';
		$LB[0].style.marginTop=sV?x:y;
		$LB[0].style.marginLeft=sV?y:x;
	},queue:false});
},

/* ERROR HANDLING */
Error:function(obj){
	var B=Boxaroo, O=B.OBJ, D=$.data(obj);
	B.Overlays(obj,false);
	O.$C[0].style.visibility='hidden'; 
	O.$LB[0].style.visibility='hidden';
	var cl=(D.error_class)?D.error_class:'Box_Error_'+D.skin;
	$('#Boxaroo').append('<div id="Box_Error" class="'+cl+'"><p>'+D.error_text+'</p></div>');
	$([O.$O[0],O.$OT[0],O.$OP[0]]).add($('#Box_Error')).on($.support.bx.cEv,function(){ B.closeLB(B.cOBJ); });
	B.hidePre(obj,D);
},






/* PRELOADER METHODS */
showPre:function(obj,oD){
	var bOBJ=Boxaroo.OBJ, $P=bOBJ.$Pre;

	/* BROWSERS THAT DON'T SUPPORT KEYFRAMES */
	if($.support.bx.TRNS){ 
		/* SETUP PRELOADER ANIMATIONS */
		var c1=oD.preClr1, c2=oD.preClr2, pre=$.support.bx.PRE,
			B='background-color:', tS='text-shadow', tR=pre+'transform:', B1=B+c1, B2=B+c2,
			DC='<div class="', DI='<div id="', ED='></div>', E='</div>', X=ED+DC, Y=ED+DI, Z=E+DC,
			C='class="', R='rotate(', TS='translate', S='scale(';
		switch(oD.pr_sty){
			case 1:var DW=52,DH=65, H=DI+'fbG">'+DC+'fbG" id="fbG_01"'+X+'fbG" id="fbG_02"'+X+'fbG" id="fbG_03"'+X+'fbG" id="fbG_04"'+X+'fbG" id="fbG_05"'+X+'fbG" id="fbG_06"'+X+'fbG" id="fbG_07"'+X+'fbG" id="fbG_08"'+ED+E,C='.fbG{'+B1+';}', K='0%{'+B2+'}100%{'+B1+'}', N='fadeG';break;
			case 2:var DW=64,DH=64, H=DI+'fCG">'+DC+'fCG" id="fCG_01"'+X+'fCG" id="fCG_02"'+X+'fCG" id="fCG_03"'+X+'fCG" id="fCG_04"'+X+'fCG" id="fCG_05"'+X+'fCG" id="fCG_06"'+X+'fCG" id="fCG_07"'+X+'fCG" id="fCG_08"'+ED+E,C='.fCG{'+B1+';}', K='0%{'+B2+'}100%{'+B1+'}', N='f_fadeG';break;
			case 3:var DW=32,DH=32, H=DI+'ballG">'+DI+'ballGR">'+DC+'ballGH">'+DC+'ballG"'+ED+'</div'+ED+E, C='#ballGR{border:4px solid '+c1+';}.ballG{'+B2+';}', K='0%{'+tR+R+'0deg);}45%{'+tR+R+'180deg);}100%{'+tR+R+'360deg);}', N='ball_moveG'; break;
			case 4:var DW=250,DH=250, H=DI+'c3dG">'+DI+'c3dG_1G" '+C+'c3dG"'+Y+'c3dG_2G" '+C+'c3dG"'+Y+'c3dG_3G" '+C+'c3dG"'+Y+'c3dG_4G" '+C+'c3dG"'+Y+'c3dG_5G" '+C+'c3dG"'+Y+'c3dG_6G" '+C+'c3dG"'+Y+'c3dG_7G" '+C+'c3dG"'+Y+'c3dG_8G" '+C+'c3dG"'+ED+E,C='',K='0%{'+tR+S+'1);'+B1+'}100%{'+tR+S+'.3);'+B2+';}',N='c3dG';break;
			case 5:var DW=128,DH=128, H=DI+'ccG">'+DI+'ccG_1" '+C+'ccG"'+Y+'ccG_2" '+C+'ccG"'+Y+'ccG_3" '+C+'ccG"'+Y+'ccG_4" '+C+'ccG"'+Y+'ccG_5" '+C+'ccG"'+Y+'ccG_6" '+C+'ccG"'+Y+'ccG_7" '+C+'ccG"'+Y+'ccG_8" '+C+'ccG"'+ED+E,C='.ccG{'+B1+'}',K='0%{'+tR+S+'1);'+B1+'}100%{'+tR+S+'.3);'+B2+'}',N='ccG';break;
			case 6:var DW=256,DH=20, H=DI+'ffBG">'+DI+'ffBG_1" '+C+'ffBG"'+Y+'ffBG_2" '+C+'ffBG"'+Y+'ffBG_3" '+C+'ffBG"'+Y+'ffBG_4" '+C+'ffBG"'+ED+E,C='.ffBG{'+B1+';}',K='0%{left:0px;'+B1+';}50%{left:236px;}100%{left:0px;'+B2+';}',N='ffBG'; break;
			case 7:var DW=30,DH=70, H=DC+'bbG"><span id="bbG_1"></span><span id="bbG_2"></span><span id="bbG_3"></span'+ED,C='.bbG span{'+B1+';}',K='0%{width:14px;height:14px;'+B1+';'+tR+TS+'Y(0);}100%{width:33px;height:33px;'+B2+';'+tR+TS+'Y(-58px);}',N='bbG'; break;
			case 8:var DW=240,DH=10, H=DI+'sWg">'+DI+'sWg_1" '+C+'sWg"'+Y+'sWg_2" '+C+'sWg"'+Y+'sWg_3" '+C+'sWg"'+Y+'sWg_4" '+C+'sWg"'+Y+'sWg_5" '+C+'sWg"'+Y+'sWg_6" '+C+'sWg"'+Y+'sWg_7" '+C+'sWg"'+Y+'sWg_8" '+C+'sWg"'+ED+E,C='.sWg{'+B1+';}',K='0%{'+B1+';}100%{'+B2+';}',N='sWg'; break;
			case 9:var DW=256,DH=20, H=DI+'lPG">'+DC+'lPG"'+ED+E,C='#lPG{'+B1+';}.lPG{'+B2+';}',K='0%{margin-left:-256px;'+B1+';}100%{margin-left:256px;'+B2+'}',N='lPG';break;
			case 10:var DW=110,DH=110, H=DI+'bTG">'+DC+'bTG">L'+Z+'bTG">o'+E+DC+'bTG">a'+Z+'bTG">d'+Z+'bTG">i'+Z+'bTG">n'+Z+'bTG">g'+Z+'bTG">.'+Z+'bTG">.'+Z+'bTG">.</div'+ED+'',C='.bTG{'+tS+': '+c1+' 0 0 0;}',K='0%{'+tS+': '+c1+' 0 0 0;}50%{'+tS+': '+c1+' 0 0 20px;}100%{'+tS+': '+c2+' 0 0 0;}',N='bTG';break;
		};
		/* COMPOSE KEYFRAME AND FULL CSS AND APPEND TO HEAD */
		bOBJ.$KFP.html(C+'@'+pre+'keyframes '+N+'{'+K+'}'); 
		$P.PLY().html(H)[0].className=(oD.preloader_class)?oD.preloader_class:'Box_Pre_'+oD.skin;
	/* USE GIF FOR LEGACY */
	}else{		
		$P.html('<img src="Boxaroo/images/Pre/'+oD.skin+'.gif" alt="Loading"/>')[0].className='Box_Pre_GIF_'+oD.skin;
		var DW=$P.outerWidth(true), DH=$P.outerHeight(true);
	};

	$P[0].style.top=(Boxaroo.winH-DW)/2+'px';
	$P[0].style.left=(Boxaroo.winW-DH)/2+'px';
	$P.Ani({'opacity':1},oD.pr_spI,null);
},
/* HIDE PRELOADER */
hidePre:function(obj,oD){
	var bOBJ=Boxaroo.OBJ, $P=bOBJ.$Pre;
	$P.Ani({'opacity':0},oD.pr_spO,function(){ $P.html(' '); });
},



// UTILITY METHODS
VwPort:function(){
	Boxaroo.winW=$win.innerWidth?$win.innerWidth:$($win).width();
	Boxaroo.winH=$win.innerHeight?$win.innerHeight:$($win).height();
},

/* CONVERT HEX TO RGB FOR RGBA ANIMATION */
H2R:function(h,a){return {r:parseInt((Boxaroo.tHx(h)).substring(0,2),16), g:parseInt((Boxaroo.tHx(h)).substring(2,4),16), b:parseInt((Boxaroo.tHx(h)).substring(4,6),16),a:a};},
tHx:function(h){return(h.charAt(0)=="#")?h.substring(1,7):h;},

/* NAV FLIPPING - IF TRANSFORMS ARE SAME, CREATE FAKE INTERMEDIATE ANI SO LB WILL TRANSFORM DURING NAV. (WHEN SETTING/FRAME_SETTING ARE EQUAL - EG FLIP:20,0 FRAME_FLIP:20,0) */
NavFlip:function(obj,D,N){/* D=OBJECT DATA, N=NEXT OBJECT DATA */
	var e=($.inArray(obj,D.GALS)%2===0),a=360,b=180,FX=N.FX,FY=N.FY,R=N.rot,KX=N.KX,KY=N.KY;
	return Boxaroo.clcTR(N.per,N.sclX,N.sclY,N.trX,N.trY,FX===N.F_FX&&FX!==0?e?a+FX:FX:FX,FY===N.F_FY&&FY!==0?e?a+FY:FY:FY,KX===N.F_KX&&KX!==0?e?-(b+KX):b+KX:KX,KY===N.F_KY&&KY!==0?e?-(b+KY):b+KY:KY,R===N.F_R&&R!==0?e?-(a+R):a+R:R);},

/* CALCULATE 2D/3D TRANSFORM STRING */	
clcTR:function(P,SX,SY,TRX,TRY,FX,FY,KX,KY,R){return ($.support.bx.TRFM)?'perspective('+P+'px) scale('+SX+','+SY+') translate3d('+TRX+'px,'+TRY+'px,0px) rotateX('+FX+'deg) rotateY('+FY+'deg) skew('+KX+'deg,'+KY+'deg) rotate('+R+'deg)':'scale('+SX+','+SY+') translateX('+TRX+'px) translateY('+TRY+'px) skew('+KX+'deg,'+KY+'deg) rotate('+R+'deg)';},
	
/* ALLOW FOR FRAME NAV OVERRIDE (SETTING AND F_SETTING TO BE THE SAME NUMBER) WILL ANIMATE THAT TRANSFORM DURING NAV ONLY */
getTR:function(D,Nav){
	var c=Nav&&D.F_OVRD,FX=D.FX,FY=D.FY,R=D.rot,KX=D.KX,KY=D.KY,SX=D.sclX,SY=D.sclY;
	return Boxaroo.clcTR(D.per,c?SX===D.F_sclX&&SX!==1?1:SX:SX,c?SY===D.F_sclY&&SY!==1?1:SY:SY,D.trX,D.trY,c?FX===D.F_FX&&FX!==0?0:FX:FX,c?FY===D.F_FY&&FY!==0?0:FY:FY,c?KX===D.F_KX&&KX!==0?0:KX:KX,c?KY===D.F_KY&&KY!==0?0:KY:KY,c?R===D.F_R&&R!==0?0:D.rot:R);},

/* JAVASCRIPT HOOK HANDLER */
jsHook:function(hook){ if(typeof $win[hook]==='function')$win[hook].apply(Boxaroo.OBJ); },

/* PROCESS USER OPTIONS */
ops:function(obj,d){
	var B=Boxaroo, URL=obj.parents('a:first')[0].href.removeWS(), 
		fEXT=URL.substring(URL.length,URL.length-4), sEXT=fEXT,	bSP=d.bg_speed.split(','),
		prSP=d.preloader_speed.split(','), b_sp=d.box_speed.split(','), c_sp=d.content_speed.split(','),
		ss_clr=d.slideshow_container_color.split(','), gNO=d.gradient_nav_opacity.split(','), gNS=d.gradient_nav_speed.split(','),
		gNC=d.gradient_nav_color.split(','), n_BS=d.nav_buttons_m_speed.split(','), els_mS=d.html_els_m_speed.split(','),
		c_O=d.counter_offsets.split(','), c_mO=d.counter_m_offsets.split(','), ssco_clr=d.slideshow_counter_color.split(','), 
		borderR=d.border_radius.split(','), sdw=d.drop_shadow.split(','), f_sdw=d.frame_drop_shadow.split(','), 
		spl=d.spiral.toLowerCase().removeWS().split(','), splD=d.spiral_direction.toLowerCase().removeWS(), 
		nav=d.nav_buttons.removeWS().split(','), co_con=d.counter_control.split(','), cap_con=d.caption_control.split(','), 
		spSP=d.spiral_speed.split(','), ca_mO=d.caption_m_offsets.split(','), ca_O=d.caption_offsets.split(','),
		c_R=d.counter_ranges.split(','), ca_R=d.caption_ranges.split(','), c_S=d.counter_speed.split(','),
		ca_S=d.caption_speed.split(','), navS=d.nav_style.split(','), elO=d.html_els_opacity.split(','),
		h_O=d.highlight_opacity.split(','), h_S=d.highlight_stops.split(','), h_Sz=d.highlight_size.split(','),
		hFO=d.highlight_frame_opacity.split(','), maS=d.matte_size.split(','), SC=d.spiral_control.split(','),
		minD=d.min_dimensions.split(','), Buf=d.edge_buffers.split(','), hiC=d.highlight_color.split(','),
		pC=d.preloader_color.split(','), SB=d.scrollbars.split(','), els=d.html_els.split(','),				
		nhSp=d.nav_hover_speed.removeWS().split('||'), nRG=d.nav_buttons_ranges.removeWS().split('||'), n_O=d.nav_buttons_offsets.removeWS().split('||'),
		nav_op=d.nav_buttons_opacity.removeWS().split('||'), elOs=d.html_els_offsets.split('||'), 
		elR=d.html_els_ranges.split('||'), el_sp=d.html_els_speed.split('||'), HSP=d.hover_speed.removeWS().split('||'), nP=d.nav_pos.split('||'), 
		n_OM=d.nav_buttons_m_offsets.split('||'), elOm=d.html_els_m_offsets.split('||'), els_pos=d.html_els_pos.split('||'), 
		hP=d.highlight_pos.split('||'), nD=d.nav_buttons_dimensions.split('||'), nBS=d.nav_button_scale.split('||'), 
		nBR=d.nav_button_rotate.split('||'), nBFX=d.nav_button_flipX.split('||'), nBFY=d.nav_button_flipY.split('||');

	obj.data({
		bg_spI:bSP[0].pF(), bg_spO:bSP[1].pF(), bg_spN:bSP[2].pF(), bg_spA:bSP[3].pF()/1000, 
		bg_op:d.bg_opacity.pF()===1?0.999:d.bg_opacity.pF(), t_op:d.bg_tile_opacity.pF()===1?0.999:d.bg_tile_opacity.pF(), 
		p_op:d.bg_pic_opacity.pF()===1?0.999:d.bg_pic_opacity.pF(),
		szX:d.content_size.sP(',',0).pF(), szY:d.content_size.sP(',',1).pF(), 
		pr_spI:prSP[0].pF(), pr_spO:prSP[1].pF(), o_clse:d.overlay_close.isB(),
		per:d.perspective.pF(), rot:d.rotate.pF(), trX:d.translate.sP(',',0).pF(), trY:d.translate.sP(',',1).pF(),
		FX:d.flip.sP(',',0).pF(), FY:d.flip.sP(',',1).pF(), KX:d.skew.sP(',',0).pF(), KY:d.skew.sP(',',1).pF(), 
		b_spI:b_sp[0].pF(), b_spO:b_sp[1].pF(), b_spN:b_sp[2].pF(), c_spI:c_sp[0].pF(), c_spO:c_sp[1].pF(), c_spN:c_sp[2].pF(),
		LO:gNO[0].pF(), RO:gNO[1].pF(), LS:gNS[0].pF(), RS:gNS[1].pF(), F_FX:d.frame_flip.sP(',',0).pF(),F_FY:d.frame_flip.sP(',',1).pF(),
		F_P:d.frame_perspective.pF(), F_R:d.frame_rotate.pF(), F_KX:d.frame_skew.sP(',',0).pF(), F_KY:d.frame_skew.sP(',',1).pF(),
		F_trX:d.frame_translate.sP(',',0).pF(), F_trY:d.frame_translate.sP(',',1).pF(),
		sclX:d.scale.sP(',',0).pF(), sclY:d.scale.sP(',',1).pF(), F_sclX:d.frame_scale.sP(',',0).pF(), F_sclY:d.frame_scale.sP(',',1).pF(),
		BD_W:d.border.sP(',',0).pF(), F_BD_W:d.frame_border.sP(',',0).pF(), BD_C:d.border.sP(',',1).fixColor(),
		brTL:borderR[0].pF(), brTR:borderR[1].pF(), brBR:borderR[2].pF(), brBL:borderR[3].pF(),		
		SD_X:sdw[0].pF(), SD_Y:sdw[1].pF(), SD_B:sdw[2].pF(), SD_SP:sdw[3].pF(), SD_OP:sdw[5].pF(),
		F_SD_OP:f_sdw[5].pF(), F_SD_X:f_sdw[0].pF(), F_SD_Y:f_sdw[1].pF(), F_SD_B:f_sdw[2].pF(), F_SD_SP:f_sdw[3].pF(), 
		F_SD_C:B.H2R(f_sdw[4].fixColor(),d.frame_shadow_opacity), SD_C:B.H2R(sdw[4].fixColor(),d.shadow_opacity),
		c_m_sp:n_BS[0].pF(), p_m_sp:n_BS[1].pF(), n_m_sp:n_BS[2].pF(), 
		c_X:n_O[0].sP(',',0).pF(), c_Y:n_O[0].sP(',',1).pF(), c_m_X:n_OM[0].sP(',',0).pF(), c_m_Y:n_OM[0].sP(',',1).pF(), 
		p_X:n_O[1].sP(',',0).pF(), p_Y:n_O[1].sP(',',1).pF(), p_m_X:n_OM[1].sP(',',0).pF(), p_m_Y:n_OM[1].sP(',',1).pF(),
		n_X:n_O[2].sP(',',0).pF(), n_Y:n_O[2].sP(',',1).pF(), n_m_X:n_OM[2].sP(',',0).pF(), n_m_Y:n_OM[2].sP(',',1).pF(), 
		c_opI:nav_op[0].sP(',',1).pF(), c_opO:nav_op[0].sP(',',0).pF(), p_opI:nav_op[1].sP(',',1).pF(), p_opO:nav_op[1].sP(',',0).pF(),
		n_opI:nav_op[2].sP(',',1).pF(), n_opO:nav_op[2].sP(',',0).pF(), 
		el1_m_X:elOm[0].sP(',',0).pF(), el1_m_Y:elOm[0].sP(',',1).pF(),	el2_m_X:elOm[1].sP(',',0).pF(), el2_m_Y:elOm[1].sP(',',1).pF(), 
		el3_m_X:elOm[2].sP(',',0).pF(), el3_m_Y:elOm[2].sP(',',1).pF(),
		el1_m_sp:els_mS[0].pF(), el2_m_sp:els_mS[1].pF(), el3_m_sp:els_mS[2].pF(),
		el1_mn:elR[0].sP(',',0).pF(), el1_mx:elR[0].sP(',',1).pF(), el2_mn:elR[1].sP(',',0).pF(), el2_mx:elR[1].sP(',',1).pF(), 
		el3_mn:elR[2].sP(',',0).pF(), el3_mx:elR[2].sP(',',1).pF(), el1_op:elO[0].pF(), el2_op:elO[1].pF(), el3_op:elO[2].pF(),
		el1_spI:el_sp[0].sP(',',0).pF(), el1_spO:el_sp[0].sP(',',1).pF(), el2_spI:el_sp[1].sP(',',0).pF(), el2_spO:el_sp[1].sP(',',1).pF(), 
		el3_spI:el_sp[2].sP(',',0).pF(), el3_spO:el_sp[2].sP(',',1).pF(),
		el1_X:elOs[0].sP(',',0).pF(), el1_Y:elOs[0].sP(',',1).pF(), el2_X:elOs[1].sP(',',0).pF(), el2_Y:elOs[1].sP(',',1).pF(), 
		el3_X:elOs[2].sP(',',0).pF(), el3_Y:elOs[2].sP(',',1).pF()})
		.data({	co_X:c_O[0].pF(), co_Y:c_O[1].pF(), co_m_X:c_mO[0].pF(), co_m_Y:c_mO[1].pF(), 
		cap_X:ca_O[0].pF(), cap_Y:ca_O[1].pF(), cap_m_X:ca_mO[0].pF(), cap_m_Y:ca_mO[1].pF(), 
		co_mn:c_R[0].pF(), co_mx:c_R[1].pF(), co_spI:c_S[0].pF(), co_spO:c_S[1].pF(), cap_mn:ca_R[0].pF(), cap_mx:ca_R[1].pF(), 
		cap_spI:ca_S[0].pF(), cap_spO:ca_S[1].pF(), c_sty:navS[0].pF(), p_sty:navS[1].pF(), n_sty:navS[2].pF(),
		c_hI:nhSp[0].sP(',',0).pF(), c_hO:nhSp[0].sP(',',1).pF(), p_hI:nhSp[1].sP(',',1).pF(),		
		p_hO:nhSp[1].sP(',',1).pF(), n_hI:nhSp[2].sP(',',0).pF(), n_hO:nhSp[2].sP(',',1).pF(),
		iniCW:nD[0].sP(',',0).pF(), iniCH:nD[0].sP(',',1).pF(), iniPW:nD[1].sP(',',0).pF(), iniPH:nD[1].sP(',',1).pF(), 
		iniNW:nD[2].sP(',',0).pF(), iniNH:nD[2].sP(',',1).pF(), co_m_sp:d.counter_m_speed.pF(), cap_m_sp:d.caption_m_speed.pF(),
		IC_S:d.hover_icon_size.pF(), hC_spI:HSP[0].sP(',',0).pF()/2, hC_spO:HSP[0].sP(',',1).pF()/2, 
		h_spI:HSP[1].sP(',',0).pF(), h_spO:HSP[1].sP(',',1).pF()*3,
		h_op1:d.hover_opacity.sP(',',0).pF(), h_op2:d.hover_opacity.sP(',',1).pF(),
		h_sclX:d.hover_scale.sP(',',0).pF(), h_sclY:d.hover_scale.sP(',',1).pF(),
		hiOp1:h_O[0].pF(), hiOp2:h_O[1].pF(), hiOp3:h_O[2].pF(), 
		hiS1:h_S[0].pF(), hiS2:h_S[1].pF(), hiS3:h_S[2].pF(), hiW:h_Sz[0].pF(), hiH:h_Sz[1].pF(),
		F_hi_opI:hFO[0].pF(), F_hi_opO:hFO[1].pF(), mc_sp:d.matte_clr_speed.pF()/1000, 
		c_sclI:nBS[0].sP(',',1).pF(), c_sclO:nBS[0].sP(',',0).pF(), p_sclI:nBS[1].sP(',',1).pF(), p_sclO:nBS[1].sP(',',0).pF(),
		n_sclI:nBS[2].sP(',',1).pF(), n_sclO:nBS[2].sP(',',0).pF(),
		c_RI:nBR[0].sP(',',1).pF(), c_RO:nBR[0].sP(',',0).pF(), p_RI:nBR[1].sP(',',1).pF(), p_RO:nBR[1].sP(',',0).pF(),
		n_RI:nBR[2].sP(',',1).pF(), n_RO:nBR[2].sP(',',0).pF(),
		c_FXI:nBFX[0].sP(',',1).pF(), c_FXO:nBFX[0].sP(',',0).pF(), p_FXI:nBFX[1].sP(',',1).pF(), p_FXO:nBFX[1].sP(',',0).pF(),
		n_FXI:nBFX[2].sP(',',1).pF(), n_FXO:nBFX[2].sP(',',0).pF(), c_FYI:nBFY[0].sP(',',1).pF(), c_FYO:nBFY[0].sP(',',0).pF(),
		p_FYI:nBFY[1].sP(',',1).pF(), p_FYO:nBFY[1].sP(',',0).pF(), n_FYI:nBFY[2].sP(',',1).pF(), n_FYO:nBFY[2].sP(',',0).pF(),
		spl_spI:spSP[0].pF(), spl_sO:spSP[1].pF(), spl_spN:spSP[2].pF(), spl_R:SC[0].pF(),spl_C:SC[1].pF(),
		mW:minD[0].pF(), mH:minD[1].pF(), bX:Buf[0].pF(), bY:Buf[1].pF(), btn_spI:d.nav_speed.pF(), 
		c_mn:nRG[0].sP(',',0).pF()/100, c_mx:nRG[0].sP(',',1).pF()/100, p_mn:nRG[1].sP(',',0).pF()/100, p_mx:nRG[1].sP(',',1).pF()/100,
		n_mn:nRG[2].sP(',',0).pF()/100, n_mx:nRG[2].sP(',',1).pF()/100, 
		c_p:nP[0].sP(',',0).pF(), p_p:nP[0].sP(',',1).pF(), n_p:nP[0].sP(',',2).pF(), 
		c_p_m:nP[1].sP(',',0).pF(), p_p_m:nP[1].sP(',',1).pF(), n_p_m:nP[1].sP(',',2).pF(), 
		el1_p:els_pos[0].sP(',',0).pF(), el2_p:els_pos[0].sP(',',1).pF(), el3_p:els_pos[0].sP(',',2).pF(),
		el1_p_m:els_pos[1].sP(',',0).pF(), el2_p_m:els_pos[1].sP(',',1).pF(), el3_p_m:els_pos[1].sP(',',2).pF(),
		co_p:d.counter_pos.sP(',',0).pF(), co_p_m:d.counter_pos.sP(',',1).pF(),
		cap_p:d.caption_pos.sP(',',0).pF(), cap_p_m:d.caption_pos.sP(',',1).pF(), 
		h_sty:d.hover_style.pF(), hTAR_spI:HSP[2].sP(',',0).pF(), hTAR_spO:HSP[2].sP(',',1).pF(),
		h_per:d.hover_perspective.pF(), h_RO:d.hover_rotate.pF()})
		.data({	h_FX:d.hover_flip.sP(',',0).pF(), h_FY:d.hover_flip.sP(',',1).pF(), h_KX:d.hover_skew.sP(',',0).pF(), h_KY:d.hover_skew.sP(',',1).pF(), 
		h_trX:d.hover_translate.sP(',',0).pF(), h_trY:d.hover_translate.sP(',',1).pF(), 
		pr_sty:d.preloader_style.pF(), hiXI:hP[0].sP(',',0).pF(), hiYI:hP[0].sP(',',1).pF(),	
		blr:d.content_blur.pF(), F_BLR:d.frame_content_blur.pF(), GRY:d.grayscale.pF(), F_GRY:d.frame_grayscale.pF(), 
		SEP:d.sepia.pF(), F_SEP:d.frame_sepia.pF(), CTR:d.contrast.pF(), F_CON:d.frame_contrast.pF(), 
		BRI:d.brightness.pF(), F_BRI:d.frame_brightness.pF(), HUE:d.hue_rotate.pF(), F_HUE:d.frame_hue_rotate.pF(), 
		SAT:d.saturation.pF(), F_SAT:d.frame_saturation.pF(), bgclrs:d.bg_color.split(','), mclrs:d.matte_color.split(','),
		l_cap:obj[0].getAttribute('title'), s_cap:obj[0].getAttribute('alt'), co_key:co_con[1], co_word:co_con[2],
		lbI:d.lightbox_effect.sP(',',0), lbO:d.lightbox_effect.sP(',',1),
		sc_clrI:ss_clr[0].fixColor(), sc_clrO:ss_clr[1].fixColor(), ssc_clrI:ssco_clr[0].fixColor(), ssc_clrO:ssco_clr[1].fixColor(),
		hiC1:hiC[0].fixColor(), hiC2:hiC[1].fixColor(), hiC3:hiC[2].fixColor(), preClr1:pC[0].fixColor(), preClr2:pC[1].fixColor(),
		hov:d.hover_type.removeWS().toLowerCase(), ent:d.lightbox_movement.sP(',',0).toLowerCase(), exit:d.lightbox_movement.sP(',',1).toLowerCase(),
		GNLC:gNC[0].fixColor(), GNRC:gNC[1].fixColor(), F_BC_C:d.frame_border.sP(',',1).fixColor(),
		SCRX:SB[0].isB(), SCRY:SB[1].isB(), sprl:spl[0].isB(), spl_RV:splD.sP(',',0).isB(), spl_N:spl[2].isB(), spl_EX:spl[1].isB(), spl_v:splD.sP(',',1).isB(), 
		ss:d.slideshow.sP(',',0).isB(), ss_co:d.slideshow.sP(',',1).isB(), sBD_W:d.scale_border.sP(',',0).isB(), sBD_R:d.scale_border.sP(',',1).isB(),
		c_btn:nav[0].isB(), p_btn:nav[1].isB(), n_btn:nav[2].isB(), co_sfx:co_con[0].isB(), cap_FW:cap_con[0].isB(), cap_G:cap_con[1].isB(), 
		hiXO:hP[1].sP(',',0)==="false" ? false : hP[1].sP(',',0).pF(), hiYO:hP[1].sP(',',1)==="false" ? false : hP[1].sP(',',1).pF(),
		el1:els[0]==="false" ? false:els[0].fixColor(), el2:els[1]==="false" ? false:els[1].fixColor(), el3:els[2]==="false" ? false:els[2].fixColor(),
		hi_sp:d.highlight_speed!==false && d.highlight_speed!==null ? d.highlight_speed.pF() : d.frame_speed.pF(),
		mBG:d.matte_bg!==false && d.matte_bg!==null ? !isNaN(d.matte_bg) ? d.matte_bg : d.matte_bg.pF() : false,
		sEXT:d.size_ext.sP(',',0)==='null'?null:d.size_ext.sP(',',0), mEXT:d.size_ext.sP(',',1)==='null'?null:d.size_ext.sP(',',1),
		altH:(d.alt_hover==="false"||d.alt_hover===false)?false:d.alt_hover.replace('.','').removeWS(),
		hTAR:d.hover_target===null||d.hover_target==='false'?false:d.hover_target.replace('.','').removeWS(),
		hCLR:d.hover_color===null||d.hover_color==='false'?false:d.hover_color.fixColor(),
		HI:d.highlight_type===false||d.highlight_type==="false"?false:d.highlight_type,
		sMAT:d.scale_matte===true||d.scale_matte==="true"?true:false, F_OVRD:d.frame_nav_override==='true'||d.frame_nav_override===true?true:false,
		cOS:d.call_on_start===false||d.call_on_start==="false"?false:true, MATt:maS[0].pF(), MATr:maS[1].pF(), MATb:maS[2].pF(), MATl:maS[3].pF(),
		GN:d.gradient_nav.isB(),FRAME:d.frame_animation.isB(), MSWHL:d.mousewheel_nav.isB(), NAVV:d.nav_vertical.isB(),
		FULL:d.full_size.isB(), TOUCH:d.touch_events.isB(), VMSE:d.vm_events.isB(), sSD:d.scale_shadow.isB(), vColor:d.video_color.replace('#',' ').removeWS(),
		BOOSTPHNE:d.boostmobile.sP(',',0).isB(), BOOSTTAB:d.boostmobile.sP(',',1).isB(), aPlay:d.autoplay.isB(), loop:d.loop.isB(),
		autoADV:d.auto_advance.isB() });
		
	/* SETUP CONTENT FILE TYPE BASED ON EXTENSION */
	if(/\.(?:jpg|jpeg|gif|png|tif|tiff|bmp)$/i.test(URL)){ d.ConTYP='image';
	}else if(URL.indexOf('vimeo')!==-1){ d.ConTYP='video';
		var vString=URL.replace('vimeo:',' ').removeWS(), vid=vString.split(',');
		d.ConSRC=vid[0]; d.vW=vid[1].pF(); d.vH=vid[2].pF();
	}else if(/\.(?:flv|swf)$/i.test(URL)){ d.ConTYP='flash'; };

	/* SETUP GALLERIES (AFTER ASSIGNED TO DATA) */
	if(obj.is("[rel]")){
		var SET=$('[rel="'+obj.attr('rel')+'"]');
		for(var i=0,l=SET.length; i<l; ++i){ $.data(SET[i],'GALS',SET); };
	}else{ 
		obj.data({GALS:obj,cap_G:false}); 
	};

	/* TABLET AND PHONE CONSIDERATIONS */
	if($.support.bx.isTablet||$.support.bx.isMobile){
		/* I. PHONES */
		if($.support.bx.isMobile){
			/* SMALL FILE EXT */
			if(d.ConTYP==='image' && d.sEXT!==null && d.sEXT!==undefined)var sEXT=d.sEXT;
			
			/* PHONE SETUP */			
			obj.data({ mW:0, mH:0, bX:5, bY:5, GN:true, FRAME:false, FULL:false, TOUCH:true, key_nav:false, o_clse:true, 
				MSWHL:false, counter:false, caption:false, c_btn:false, p_btn:false, n_btn:false,el1:false,el2:false,el3:false,
				FX:0,FY:0,rot:0,KX:0,KY:0,trX:0,trY:0,sclX:1,sclY:1, hiXO:false?false:obj.data().hiXO*.25, hiYO:false?false:obj.data().hiYO*.10,
				MATt:d.MATt*0.25, MATr:d.MATr*0.25, MATb:d.MATb*0.25, MATl:d.MATl*0.25 });

			/* MAKE OVERLAYS MATCH SCREEN DIMENSIONS + SMALL BUFFER */
			$([B.OBJ.$O[0],B.OBJ.$OT[0],B.OBJ.$OP[0]]).css({'width':B.winW+5, 'height':B.winH+5});
			
			/* BOOST PERFORMANCE FOR MOBILE DEVICES */
			if(d.BOOSTPHNE){ obj.data({ HI:false, FRAME:false, mBG:false });
				$.support.bx.SDWS=false; d.mclrs.length=1;  d.bgclrs.length=1;				
			};

		/* II. TABLETS */			
		}else{
			/* MEDIUM FILE EXT */
			if(d.ConTYP==='image' && d.mEXT!==null && d.mEXT!==undefined)var sEXT=d.mEXT;

			var tabS=d.nav_mobile_size, cl_sz=tabS.sP(',',0), pr_sz=tabS.sP(',',1), nx_sz=tabS.sP(',',2);

			/* DISABLE FEATURES NOT NEEDED BY TABLETS (AND SCALE NAV BUTTONS BASED ON NAV_MOBILE_SIZE FACTOR) */			
			obj.data({ MSWHL:false, F_BD_W:d.BD_W, F_BC_C:d.BD_C,
				c_sclI:(cl_sz!==1)?nBS[0].sP(',',1).pF()*cl_sz:1, 
				c_sclO:(cl_sz!==1)?nBS[0].sP(',',0).pF()*cl_sz:1, 
				p_sclI:(pr_sz!==1)?nBS[1].sP(',',1).pF()*pr_sz:1, 
				p_sclO:(pr_sz!==1)?nBS[1].sP(',',0).pF()*pr_sz:1, 
				n_sclI:(nx_sz!==1)?nBS[2].sP(',',1).pF()*nx_sz:1,
				n_sclO:(nx_sz!==1)?nBS[2].sP(',',0).pF()*nx_sz:1		
			});

			/* BOOST PERFORMANCE FOR TABLETS */
			if(d.BOOSTTAB){
				obj.data({ HI:false, FRAME:false, mBG:false});
				$.support.bx.SDWS=false; d.mclrs.length=1;  d.bgclrs.length=1;
			};
		};
		
		/* APPLY FILE EXTENSION */
		if(sEXT!==fEXT)var fEXT=sEXT+fEXT;
	};

	/* UPDATE SRC */
	if(d.ConTYP==='image')d.SRC=URL.substring(0,URL.length-4)+fEXT;
	/* ENABLE VIRTUAL MOUSE EVENTS WITH TOUCH EVENTS */	
	if(d.TOUCH)d.VMSE=true;
	/* DISABLE ALL SCALING IF SCALING IS OFF */
	if(!d.scaling)obj.data({sBD_W:false, sBD_R:false, sSD:false});
	/* DISABLE CERTAIN EVENTS WITH SLIDESHOWS */
	if(d.ss)obj.data({key_nav:false, TOUCH:false, VMSE:false, GN:false, MSWHL:false });
	/* BROWSERS THAT DON'T SUPPORT BACKGROUND-SIZE COVER: */
	if(!$.support.bx.bgSize)B.OBJ.$OP.css({'min-width':'100%','min-height':'100%'})
	/* AUTOMATICALLY SET THE IMAGE AS BACKGROUND WITH FULL_SIZE */
	if(d.FULL)obj.data({bg_pic:d.ConTYP==='image' ? true : d.bg_pic});
	/* SPECIAL FLASH AND VIDEO SETTINGS */
	if(d.ConTYP==='video'||d.ConTYP==='flash'){
		obj.data({HI:false, FULL:false, MSWHL:false, GN:false, brTL:0, brTR:0, brBL:0, brBR:0, key_nav:false});
		/* DISABLE LOOPING FOR AUTO-ADVANCED VIDS */
		if(d.autoADV)obj.data({ loop:false });
		/* SAFARI CAN'T HANDLE TRANSFORMS AND FLASH */
		if(d.ConTYP==='flash'&&$.support.bx.safari)obj.data({FX:0, FY:0, F_FX:0, F_FY:0});
	};
	/* DISABLE HIGHLIGHTS +GNAV WITHOUT GRADIENTS SUPPORT */
	if(!$.support.bx.GRDT)obj.data({HI:false, GN:false});
	/* IF COMPONENT MOVE POSITIONS MATCH, MAKE APPROPRIATE OFFSETS MATCH (TO AVOID ONRESIZE POSITION ERRORS) */
	if(d.c_p===d.c_p_m)obj.data({c_m_X:d.c_X, c_m_Y:d.c_Y});
	if(d.n_p===d.n_p_m)obj.data({n_m_X:d.n_X, n_m_Y:d.n_Y});
	if(d.p_p===d.p_p_m)obj.data({p_m_X:d.p_X, p_m_Y:d.p_Y});
	if(d.el1_p===d.el1_p_m)obj.data({el1_m_X:d.el1_X, el1_m_Y:d.el1_Y});
	if(d.el2_p===d.el2_p_m)obj.data({el2_m_X:d.el2_X, el2_m_Y:d.el2_Y});
	if(d.el3_p===d.el3_p_m)obj.data({el3_m_X:d.el3_X, el3_m_Y:d.el3_Y});
	if(d.co_p===d.co_p_m)obj.data({co_m_X:d.co_X, co_m_Y:d.co_Y});
	if(d.cap_p===d.cap_p_m)obj.data({cap_m_X:d.cap_X, cap_m_Y:d.cap_Y});
	/* ALLOW USERS CHOOSE ANIMATION TYPE */
	if($.support.bx.mozilla&&d.firefox_animations!=="css3"||$.support.bx.chrome&&d.chrome_animations!=="css3"||$.support.bx.safari&&d.safari_animations!=="css3"||$.support.bx.msie&&d.ie_animations!=="css3"||$.support.bx.opera&&d.opera_animations!=="css3")$.support.bx.TRNS=false;
}};
//////// EXTEND JQUERY FUNCTIONALITY
$.fn.extend({
Ani:function(Ani,d,cF){
		/* ANI=ANIMATION ARGUMENTS, D=DURATION, CF=COMPLETE FUNCTION */
		var obj=$(this), cOBJ=Boxaroo.cOBJ||$(this).find('img'), tStr='';
		
		/* CSS3 */
		if($.support.bx.TRNS){
			for(var k in Ani){if(Ani.hasOwnProperty(k))tStr+=''+k+' '+d/1000+'s '+$.data(cOBJ).transition_timing+' 0s,';};
			Ani.transition=tStr.replace(/,+$/, "");
			obj.css(Ani).one($.support.bx.TRANSEND,function(e){
				/* REMOVE TransEnd TO PREVENT MULTIPLE FIRING (EVEN WITH .ONE) */
				obj.off($.support.bx.TRANSEND);
				if(typeof cF==='function')cF.apply(this,arguments);
				e.stopPropagation(); 
			});

		/* JQUERY */
		}else{
			obj.animate(Ani,{duration:d,queue:false,complete:function(){
				if(typeof cF==='function')cF.apply(this,arguments);
			}});
		};
	return obj;
},

/* PLAY + PAUSE CSS3 ANIMATIONS */
PLY:function(){ 
	var PRE=$.support.bx.PRE+'animation-play-state';
	if($.support.bx.ANI)return this.css(PRE,'running'); 
	return this;
},
PSE:function(){ 
	var PRE=$.support.bx.PRE+'animation-play-state';
	if($.support.bx.ANI)return this.css(PRE,'paused');
	return this;
},

/* POSITION COMPONENTS */
pos:function(p,pos,X,Y,oW,oH,m){
	var obj=$(this);
	/* P=OBJECT PASSED IN, POS=POSITION, X=X OFFSET, Y=Y OFFSET, OW=OBJ WIDTH, OH=OBJ HEIGHT, m=BOOLEAN (MOVE),
	_T=LIGHTBOX TOP, _L=LIGHTBOX LEFT, _W=LIGHTBOX WIDTH, _H=LIGHTBOX HEIGHT
	P.SW=SCROLL WIDTH TO ENFORCE SCREEN BOUNDARIES (FIXED AMOUNT CURRENTLY SET FOR PSI.SCROLLW) */
	switch(pos){		
		/* CHECK TO MAKE SURE COMPONENTS ARE NOT POSITIONED OFF-SCREEN (HELPS WITH SMALLER DEVICES) + POSITION */
		case 1: var o={
			t:p._T+Y, 
			l:p._L+X
		}; break;
		case 2: var o={
			t:p._T+Y, 
			l:p._L+(p._W/2)-(oW/2)+X
		}; break;
		case 3:	var o={
			t:p._T+Y, 
			l:p._L+p._W-oW+X
		}; break;
		case 4: var o={
			t:p._T-oH+(p._H/2)+Y, 
			l:p._L+p._W-oW+X
		}; break;
		case 5: var o={
			t:p._T+p._H-oH+Y, 
			l:p._L+p._W-oW+X
		}; break;
		case 6:	var o={
			t:p._T+p._H-oH+Y, 
			l:p._L+(p._W/2)-(oW/2)+X
		}; break;
		case 7:	var o={
			t:p._T+p._H-oH+Y, 
			l:p._L+X
		}; break;
		case 8: var o={
			t:p._T-oH+(p._H/2)+Y, 
			l:p._L+X
		}; break;
		case 9: var o={
			t:p._T-oH+Y, 
			l:p._L+X
		}; break;
		case 10: var o={
			t:p._T-oH+Y, 
			l:p._L+(p._W/2)-(oW/2)
		}; break;
		case 11: var o={
			t:p._T-oH+Y, 
			l:p._L+p._W-oW+X
		}; break;
		case 12: var o={
			t:p._T+(p._H/2)-(oH/2)+Y, 
			l:p._L+p._W+X
		};break;
		case 13: var o={
			t:p._T+p._H+Y, 
			l:p._L+p._W-oW+X
		}; break;
		case 14: var o={
			t:p._T+p._H+Y, 
			l:p._L+(p._W/2)-(oW/2)+X
		}; break;
		case 15: var o={
			t:p._T+p._H+Y, 
			l:p._L+X
		}; break;
		case 16: var o={
			t:p._T+(p._H/2)-(oH/2)+Y, 
			l:p._L-oW+X
		}; break;
		case 17: var o={
			t:Y, 
			l:X
		}; break;
		case 18: var o={
			t:Y, 
			l:(p.wW/2)-(oW/2)
		}; break;
		case 19: var o={
			t:Y, 
			l:p.wW-oW+X
		}; break;
		case 20: var o={
			t:p.wH/2-(oH/2)+Y, 
			l:p.wW-oW+X
		}; break;
		case 21: var o={
			t:p.wH-oH+Y, 
			l:p.wW-oW+X
		}; break;
		case 22: var o={
			t:p.wH-oH+Y, 
			l:(p.wW/2)-(oW/2)+X
		}; break;
		case 23: var o={
			t:p.wH-oH+Y, 
			l:X
		}; break;
		case 24: var o={
			t:(p.wH/2)-(oH/2)+Y, 
			l:X
		}; break;
		case 25: var o={
			t:(p.wH/2)-(oH/2)+Y, 
			l:(p.wW/2)-(oW/2)+X
		};break;
	};	
	if(!m){ obj[0].style.top=o.t+'px'; obj[0].style.left=o.l+'px'; return obj; 	
	//!!!!
	}else{/* ANIMATION */ return obj.Ani({'top':o.t+'px','left':o.l+'px'},m,null); };
}});

$.fn.Boxaroo=function(method,options){
	if(Boxaroo[method]){ return Boxaroo[method].apply(this,Array.prototype.slice.call(arguments,1));
	}else if(typeof method==='object'||!method){ return Boxaroo.init.apply(this,arguments);
	}else{ $.error('Method '+method+' does not exist'); }
}})(jQuery);

/* EXTEND $.SUPPORT FUNCTION FOR FEATURE DETECTION TO AVOID USING MODERNIZR (MUCH LIGHTER) */
(function(){
	var doc=document,
		BD=doc.body||doc.documentElement,
		tS=BD.style,
		uA=navigator.userAgent.toLowerCase(),
		check=false,
		u=undefined;
	$.support.bx={
		'ANI':(tS.animation!==u||tS.WebkitAnimation!==u||tS.MozAnimation!==u||tS.msAnimation!==u||tS.OAnimation!==u)?true:false,
		'TRNS':(tS.transition!==u||tS.WebkitTransition!==u||tS.MozTransition!==u||tS.msTransition!==u||tS.OTransition!==u)?true:false,
		'SDWS':(tS.boxShadow!==u||tS.WebkitboxShadow!==u||tS.MozBoxShadow!==u||tS.msBoxShadow!==u||tS.OBoxShadow!==u)?true:false,
		'TRFM':(tS.perspective!==u||tS.WebkitPerspective!==u||tS.MozPerspective!==u||tS.msPerspective!==u||tS.OPerspective!==u)?true:false,
		'TRFM2D':(tS.transform!==u||tS.WebkitTransform!==u||tS.MozTransform!==u||tS.msTransform!==u||tS.OTransform!==u)?true:false,
		'bgSize':(tS.backgroundSize!==u||tS.WebkitBackgroundSize!==u||tS.MozBackgroundSize!==u||tS.msBackgroundSize!==u||tS.OBackgroundSize!==u)?true:false,
		'PRE':(function(){
				if(/webkit/.test(uA))return '-webkit-';
				if(/mozilla/.test(uA)&&!/(compatible|webkit)/.test(uA))return '-moz-';
				if(/msie/.test(uA)&&!/opera/.test(uA))return '-ms-';
				if(/opera/.test(uA))return '-o-';
				return;})(),
		'cEv':!!('ontouchstart' in window) ? 'touchstart' :'click',		
		'GRDT':(function(){
			/* DISABLE IN IE7/8 */
			if(window.attachEvent&&!window.addEventListener)return false;
			var mElem=doc.createElement('modern'), mS=mElem.style.backgroundImage;
			mS="linear-gradient(left top, #9f9, white)";
			mS="-o-linear-gradient(left top, #9f9, white)";
			mS="-moz-linear-gradient(left top, #9f9, white)";
			mS="-webkit-linear-gradient(left top, #9f9, white)";
			mS="-ms-linear-gradient(left top, #9f9, white)";
			mS="-webkit-gradient(linear, left top, right bottom, from(#9f9), to(white))";
			return (mS.indexOf("gradient")==-1)?false:true;})(),
		'v':(uA.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ )||[0,'0'])[1],
		'safari':/webkit/.test(uA),
		'opera':/opera/.test(uA),
		'msie':/msie/.test(uA)&&!/opera/.test(uA),
		'mozilla':/mozilla/.test(uA)&&!/(compatible|webkit)/.test(uA),
		'chrome':/chrome/.test(uA),
		'isTablet':uA.match(/iPad|Android|Kindle|NOOK|tablet/i)!==null,
		'isMobile':(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true;
		return check;})(uA||navigator.vendor||window.opera)
	};

	/* BROWSERS THAT SUPPORT CSS IMAGE FILTERS */
	$.support.bx.Filters=($.support.bx.PRE==='-webkit-')?true:false;
	
	/* FORCE GRADIENT SUPPORT IN IE9 USING IE/FILTER */
	if($.support.bx.msie&&$.support.bx.v===9)$.support.bx.GRDT=true;
	
	/* GET TRANSITION END EVENT */
	$.support.bx.TRANSEND=(function(){
		switch ($.support.bx.PRE){
			case '-webkit-': return 'webkitTransitionEnd'; break;
			case '-o-': return 'oTransitionEnd OTransitionEnd'; break;
			case '-ms-': return 'MSTransitionEnd transitionend'; break;
			default : return 'transitionend'; break;
	};})();

})();
/* GET JQUERY VERSION AND WARN IS USER HASN'T LINKED JQUERY CORRECTLY */
if(typeof jQuery==='undefined')alert("jQuery is not properly linked in your <HEAD>.");
/* requestAnimationFrame PLUGIN-v0.1.2-2013-04-15 || https://github.com/gnarf37/jquery-requestAnimationFrame || Copyright (c) 2013 Corey Frang; Licensed MIT */
(function(e){function o(){t&&(i(o),jQuery.fx.tick())}var t,n=0,r=["webkit","moz"],i=window.requestAnimationFrame,s=window.cancelAnimationFrame;for(;n<r.length&&!i;n++)i=window[r[n]+"RequestAnimationFrame"],s=s||window[r[n]+"CancelAnimationFrame"]||window[r[n]+"CancelRequestAnimationFrame"];i?(window.requestAnimationFrame=i,window.cancelAnimationFrame=s,jQuery.fx.timer=function(e){e()&&jQuery.timers.push(e)&&!t&&(t=!0,o())},jQuery.fx.stop=function(){t=!1}):(window.requestAnimationFrame=function(e,t){var r=(new Date).getTime(),i=Math.max(0,16-(r-n)),s=window.setTimeout(function(){e(r+i)},i);return n=r+i,s},window.cancelAnimationFrame=function(e){clearTimeout(e)})})(jQuery);