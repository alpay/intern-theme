$(document).ready(function(){
        PhotoWall.init({
            el:                 '#gallery'               // Gallery element
            ,zoom:              false                     // Use zoom
            ,zoomAction:        'mouseenter'             // Zoom on action
            ,zoomTimeout:       500                      // Timeout before zoom
            ,zoomDuration:      100                      // Zoom duration time
            ,zoomImageBorder:   5                        // Zoomed image border size 
            ,showBox:           true                     // Enavle fullscreen mode
            ,showBoxSocial:     true                     // Show social buttons
            ,padding:           0                        // padding between images in gallery
            ,lineMaxHeight:     320                     // Max set height of pictures line
            ,lineMaxHeightDynamic: false                 // Dynamic lineMaxHeight. If set to True,
                                                         // then line height will be changing on 
                                                         // resize, coressponding to 
                                                         // baseScreenHeight param
            ,baseScreenHeight:  400                     // Base screen size from wich calculating dynamic lineMaxHeight  
        });
        // Max image width form Picasa
        // 94, 110, 128, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 
        // 1024, 1152, 1280, 1440, 1600
         
        $.ajax({
            url: 'https://picasaweb.google.com/data/feed/api/user/117584330358612895443/albumid/6261323901296507105'
                 +'/?alt=json&fields=entry(gphoto:id,title,media:group(media:thumbnail,media:'
                 +'content))&imgmax=720',
            dataType: 'jsonp',
            success: function(data){
                var photos = {}
                if(!data.feed.entry) return;
                for(var i in data.feed.entry) {
                    var e     = data.feed.entry[i].media$group;
                    var id    = data.feed.entry[i].gphoto$id.$t;
                    
                    var t1h   = e.media$thumbnail[2].height;
                    var t1w   = e.media$thumbnail[2].width;
                    var t1src = e.media$thumbnail[2].url
                    
                    var t2w   = Math.round(t1w * 1.5);
                    var t2h   = Math.round(t1h * 1.5);

                    var t2src = e.media$content[0].url+'/../../w'+t2w+'-h'+t2h+'/';
                    
                    var bsrc  = e.media$content[0].url;
                    var bw    = e.media$content[0].width;
                    var bh    = e.media$content[0].height;
                    
                    
                    photos[id] = {id:id,img:bsrc,width:bw,height:bh,
                                  th:{src:t1src,width:t1w,height:t1h,
                                      zoom_src:t2src,zoom_factor:1.5
                                  }
                    };
                    
                }    
                PhotoWall.load(photos);
            }
        });

         $('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

         $(".rock-you").click(function(){
    alert("Staj Kampı Rocks <3");
});
    });

