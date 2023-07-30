//####################################################
// $uery Handle
//####################################################

(function($) {


    $(document).on('click', '.leftnav-listing li > a', function() {
        var getattr = ($(this).attr('href')).trim();
        var headmrg = ($('[id="' + getattr.substr(1) + '"]').css('margin-top')).slice(0, -2);
        $('html, body').animate({
            scrollTop: $('[id="' + getattr.substr(1) + '"]').offset().top - /*$('.header').outerHeight()*/ -headmrg
        }, 1000);
    });

    function onScrollHighlighted() {
        var leftNavHeight = 0;
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        var contentnavArray = [];
        var scrollPos = $(document).scrollTop();
        var header_height = $('.header').outerHeight();

        $('.leftnav-listing li a').each(function() {
            var currLink = $(this);
            var refElement = currLink.attr('href').replace('#', '');
            contentnavArray.push(refElement);
        });


        $.each(contentnavArray, function(i, val) {
            var refElement = $('section#' + val);
            var currLink = $('*[href=\'#' + val + '\']');
            var nextrefElement;
            if (contentnavArray.length > i + 1) {
                nextrefElement = $('section#' + contentnavArray[i + 1]);
            } else {
                nextrefElement = $('footer');
            }
            if (0 !== refElement.length) {
                if (refElement.offset().top - header_height <= scrollPos && nextrefElement.offset().top > scrollPos) {
                    $('.leftnav-listing li').removeClass('is_visiable_section');
                    currLink.parents('.leftnav-listing li').addClass('is_visiable_section');
                } else if (0 === (scrollHeight - scrollPosition) / scrollHeight) {
                    currLink.parents('.leftnav-listing li').removeClass('is_visiable_section');
                    currLink.parents('.leftnav-listing li').addClass('is_visiable_section');
                } else {
                    currLink.parents('.leftnav-listing li').removeClass('is_visiable_section');
                }
            }
        });
    }

    //menu responsive navbar
    function menuNavbar() {
        //menu responsive
        var w_width = $(window).width();
        /*Menu toggle Button*/
        $('.nav-button').click(function() {

            $('body').toggleClass('show_menu');
            $('.nav-wrap ul.top_nav').slideToggle();
        });
        /*Append down-arrow Span*/
        $('ul.top_nav > li:has(ul)').addClass('has-submenu').append('<span class="down-arrow"></span>');
        $('li.has-submenu ul > li:has(ul)').addClass('has-submenu').append('<span class="down-arrow"></span>');

        /*Navigation Menu */

        /*Multi level*/
        $("ul.top_nav li span.down-arrow").on("click", function(e) {
            if ($(this).parents(".has-submenu").hasClass("submenu-active") && (!($(this).parent().hasClass("submenu-active")))) {
                $(this).parent().siblings().removeClass("submenu-active");
                $(this).parent().addClass("submenu-active");
                $(this).parent().siblings(".has-submenu").children(".sub-nav").slideUp(400);
                $(this).siblings(".sub-nav").slideDown(400);
            } else if ($(this).parents(".has-submenu").hasClass("submenu-active") && $(this).parent().hasClass("submenu-active")) {
                $(this).parent().removeClass("submenu-active");
                $(this).siblings(".sub-nav").slideUp(400);
            } else {
                $(this).parent().siblings().removeClass("submenu-active");
                $(this).parent().addClass("submenu-active");
                $(".has-submenu > .sub-nav").slideUp(400);
                $(this).siblings(".sub-nav").slideDown(400);
            }
        });

        /*First Level*/
        // $('ul.top_nav li span.down-arrow').click(function(e) {
        //     $(this).parent().siblings().removeClass('submenu-active');
        //     $(this).parent().toggleClass('submenu-active');
        //     $('.sub-nav').not($(this).siblings() && $(this).parents('.sub-nav')).slideUp();
        //     $(this).siblings('.sub-nav').slideToggle();
        //     e.stopPropagation();
        // });

        onScrollHighlighted();
    }

    function sticky() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.header-sticky').addClass('sticky');
                $('.sticky-search').addClass('sticky');
                $('.sticky-search').addClass('sticky-play');
                $('.cart').addClass('cart-picel');
                $('.hb-menu .acti_scroll').removeClass('acti_scroll')

            } else {
                $('.header-sticky').removeClass('sticky');
                $('.sticky-search').removeClass('sticky');
                $('.sticky-search').removeClass('sticky-play');
                $('.cart').removeClass('cart-picel');
                $('.hb-menu .hm-minicart').addClass('acti_scroll')

            }
        });
    }
    // ftilter time
    // Pickadate.js v3.5.6  *Buttons inside picker will not work in IE
    // IE Fix: drop to v3.5.4 and disable picker on focus with $('.date-input').off('click focus');

    // custome dropdown with image



    // addproduct select multi

    $(document).ready(function() {

        sticky();
        menuNavbar();
        // LocationSearchMap()
        // modal login customer
        $('.popUpBtn').click(function() {
            $('#' + $(this).data('modal')).css('display', 'block');
        })

        $('span.close').on('click', function() {
            $('.modal').css('display', 'none');
        });
        // size type
        // to print on click

        $('.print').click(function() {
            window.print();
            return false;
        });
        // productTab active
        $('.li_tab').on('click', function() {
            $('.li_tab a').removeClass('active')
            $(this).find('a').addClass('active')
        })

        // $(".nav-item").click(function() {
        //     $('.nav-link').removeClass('active')

        //     $(this).find('a').addClass("active")


        // });




        // $('.selectpicker').selectpicker();
        // return false;
        // print()

    })

    function LocationSearchMap() {
        // Prepare location info object.
        var locationInfo = {
            geo: null,
            country: null,
            state: null,
            city: null,
            postalCode: null,
            street: null,
            streetNumber: null,
            reset: function() {
                this.geo = null;
                this.country = null;
                this.state = null;
                this.city = null;
                this.postalCode = null;
                this.street = null;
                this.streetNumber = null;
            }
        };

        googleAutocomplete = {
            autocompleteField: function(fieldId) {
                (autocomplete = new google.maps.places.Autocomplete(
                    document.getElementById(fieldId)
                )), { types: ["geocode"] };
                google.maps.event.addListener(autocomplete, "place_changed", function() {
                    // Segment results into usable parts.
                    var place = autocomplete.getPlace(),
                        address = place.address_components,
                        lat = place.geometry.location.lat(),
                        lng = place.geometry.location.lng();

                    // Reset location object.
                    locationInfo.reset();

                    // Save the individual address components.
                    locationInfo.geo = [lat, lng];
                    for (var i = 0; i < address.length; i++) {
                        var component = address[i].types[0];
                        switch (component) {
                            case "country":
                                locationInfo.country = address[i]["long_name"];
                                break;
                            case "administrative_area_level_1":
                                locationInfo.state = address[i]["long_name"];
                                break;
                            case "locality":
                                locationInfo.city = address[i]["long_name"];
                                break;
                            case "postal_code":
                                locationInfo.postalCode = address[i]["long_name"];
                                break;
                            case "route":
                                locationInfo.street = address[i]["long_name"];
                                break;
                            case "street_number":
                                locationInfo.streetNumber = address[i]["long_name"];
                                break;
                            default:
                                break;
                        }
                    }

                    // Preview map.
                    var src =
                        "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCMST7WB3_rS_kPKqvjqnDry-nUrgN5bd4&center=" +
                        lat +
                        "," +
                        lng +
                        "&zoom=14&size=480x125&maptype=roadmap&sensor=false",
                        img = document.createElement("img");

                    img.src = src;
                    img.className = "absolute top-0 left-0 z-20";
                    document.getElementById("js-preview-map").appendChild(img);

                    // Preview JSON output.
                    document.getElementById("js-preview-json").innerHTML = JSON.stringify(
                        locationInfo,
                        null,
                        4
                    );
                });
            }
        };

        // Attach listener to address input field.
        googleAutocomplete.autocompleteField("address");
    }

    function print() {
        document.querySelector('.print').addEventListener('click', function() { // bind event to print button
            // // printContent('.content-deal'); // initial print function on selector for content to be printed
            // var restorepage = document.body.innerHTML; // save original page html to variable
            // var printcontent = document.querySelector('.content-deal').innerHTML; // save content to be printed to variable
            // document.body.innerHTML = printcontent; // display only content to be printed in document body
            // window.print(); // print commands
            // document.body.innerHTML = restorepage; // restore original page content

            const x = document.getElementsByTagName("head")[0].innerHTML;
            const iframe = document.createElement("iframe");
            iframe.onload = () => {
                console.log("Local iframe is now loaded.");
                setTimeout(() => {
                    window.frames["ng-print"].focus();
                    window.frames["ng-print"].print();
                    document.body.removeChild(iframe);
                }, 500);
            };
            iframe.name = "ng-print"
            iframe.style.position = "absolute";
            iframe.style.top = "-1000000px";
            document.body.appendChild(iframe);
            var frameDoc = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.document ? iframe.contentDocument.document : iframe.contentDocument;
            frameDoc.document.open();

            frameDoc.document.write(x);
            frameDoc.document.write(
                document.getElementsByTagName("tbody")[0].innerHTML

            );
            frameDoc.document.close();
            //remove iframe after print or cancelation
            setTimeout(function() {
                var ar = document.querySelectorAll('iframe');

                // ar[0].parentNode.removeChild(ar[0]);

            }, 500);





        }, false);
    }



    // allow numeric characters value input
    $(document).on('change', '.validateNumber', function() {
        var abc = parseInt($(this).val());
        if (isNaN(abc)) abc = '';
        $(this).val(abc);
    });
    // isNumber type value

    $(window).load(function() {


        // $(document).on("click", "#emoji-picker", function() {
        //     var textArea = $('.text-area');
        //     var emoji = $('.emoji-picker');
        //     textArea.val(textArea.val() + emoji.text());
        //     // $("#emoji-picker").hide();
        //     textArea.focus();
        // });
        // zoom image support admin
        const modal = document.getElementsByClassName('idMyModal');
        const img = document.getElementsByClassName('toZoom');
        const modalImg = document.getElementsByClassName('Zoom-modal-content');
        for (let i = 0; i < img.length; i++) {
            img[i].onclick = function() {
                modal[i].style.display = "block";
                modalImg[i].src = this.src;
            }
        }

        var span = document.getElementsByClassName("close-Zoom-modal");
        for (let i = 0; i < span.length; i++) {
            span[i].onclick = function() {
                modal[i].style.display = "none";
            }
        }


        // send email loading support contact
        $('.u-pull-right input[role="send"]').click(function() {
            var $t = $(this);
            var hasClass = $t.hasClass('done');
            if (!hasClass) {
                $(this).addClass('clicked');
                setTimeout(function() {
                    $t.removeClass('clicked').addClass('done').attr({
                        value: '',
                    });
                }, 4000);
            } else if (hasClass) {
                $t.removeClass().attr({
                    value: 'Send',
                });
            }
        });


        // emoji
        // emojiPicker();

        /* Toogle */

        // add_to_cart();






        //SCROLL ANIMATE
        var scroll = window.requestAnimationFrame ||
            function(callback) { window.setTimeout(callback, 1000 / 60) };
        var elementsToShow = document.querySelectorAll('.show-on-scroll');

        function loop() {

            Array.prototype.forEach.call(elementsToShow, function(element) {
                if (isElementInViewport(element)) {
                    element.classList.add('is-visible');
                } else {
                    element.classList.remove('is-visible');
                }
            });

            scroll(loop);
        }
        loop();

        function isElementInViewport(el) {
            // special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            var rect = el.getBoundingClientRect();
            return (
                (rect.top <= 0 &&
                    rect.bottom >= 0) ||
                (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
                (rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }




        //SCROLL ANIMATE
        var scroll2 = window.requestAnimationFrame ||
            function(callback2) { window.setTimeout(callback2, 1000 / 60) };
        var elementsToShow2 = document.querySelectorAll('.show-on-scroll2');

        function loop2() {

            Array.prototype.forEach.call(elementsToShow2, function(element) {
                if (isElementInViewport(element)) {
                    element.classList.add('is-visible2');
                } else {
                    element.classList.remove('is-visible2');
                }
            });

            scroll2(loop2);
        }
        loop2();

        function isElementInViewport(el) {
            // special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            var rect2 = el.getBoundingClientRect();
            return (
                (rect2.top <= 0 &&
                    rect2.bottom >= 0) ||
                (rect2.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect2.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
                (rect2.top >= 0 &&
                    rect2.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }

        // login dropdown
        // pay _customer
        //Menu Toggle Script
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        // For highlighting activated tabs
        $("#tab1").click(function() {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab1").addClass("active1");
            $("#tab1").removeClass("bg-light");

        });
        $("#tab2").click(function() {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab2").addClass("active1");
            $("#tab2").removeClass("bg-light");
        });
        $("#tab3").click(function() {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab3").addClass("active1");
            $("#tab3").removeClass("bg-light");
        });
        $("#tab4").click(function() {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab4").addClass("active1");
            $("#tab4").removeClass("bg-light");
        });
        $('#loadOverlay').fadeOut('slow');

        $('#loginModal').modal('show');
    })
    $(window).resize(function() {
        //menu responsive navbar
        var w_width = $(window).width();
        if (w_width >= 965 || w_width >= 351) {
            $('.nav-wrap ul.top_nav').show();
            $('.nav-wrap ul.top_nav').removeAttr("style");;
        }

        // onScrollHighlighted();
        // mainjs

        // jQuery('.hb-menu nav').meanmenu({
        // 	meanMenuContainer: '.mobile-menu',
        // 	meanScreenWidth: "991"
        // })
        // menu responsive

        /*----------------------------------------*/
        /*  02. Header Dropdown
        /*----------------------------------------*/
        // Li's Dropdown Menu
        $('.ht-setting-trigger, .ht-currency-trigger, .ht-language-trigger, .hm-minicart-trigger, .cw-sub-menu').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('is-active');
            $(this).siblings('.ht-setting, .ht-currency, .ht-language, .minicart, .cw-sub-menu li').slideToggle();
        });
        $('.ht-setting-trigger.is-active').siblings('.catmenu-body').slideDown();
        // $('.nav-wrap ul.top_nav')

        // Ckeditor

        // $('.editor').each(function() {
        //     var id = $(this).attr('id');

        //     var config = $(this).attr('_config');
        //     config = (config) ? JSON.parse(config) : {};

        //     CKEDITOR.replace(id, config).on("change", function() {
        //         CKEDITOR.instances[id].updateElement();
        //     });
        // });

        // menu





        $(window).on('click', function(event) {
            if (jQuery.inArray(event.target, $('.modal')) != "-1") {
                $('.modal').css('display', 'none');
            }
        })





        // login_main
        // $(function() {
        //         $('[data-toggle="tooltip"]').tooltip()
        //     })
        // Lightbox 
        // $('.lightbox').colorbox();

        // Number format
        // $('.format_number').number(true);

        // Currency format
        // $('.format_currency').formatCurrency({
        //     roundToDecimalPlace: 0,
        //     symbol: ''
        // });
        // $('.format_currency').blur(function() {
        //     $(this).formatCurrency({
        //         roundToDecimalPlace: 0,
        //         symbol: ''
        //     });
        // });

        //Xác thực xóa dữ liệu
        // $('a.verify_action').click(function() {
        //     if (!confirm('Bạn chắc chắn muốn xóa ?')) {
        //         return false;
        //     }
        // });



        // Sort col table
        $('table td.sortCol').each(function() {
            var _t = $(this);
            var html = '<div>' + _t.html() + '<span></span></div>';
            _t.html(html);
        });


        // List handle
        var $list_filter = $('.list_filter');
        var $list_item = $('.list_item');

        $list_item.find('.view_of_field').click(function() {
            var param = $(this).attr('_param');
            var value = $(this).attr('_value');

            $list_filter.find('[name=' + param + ']').val(value);
            $list_filter.submit();

            return false;
        });

        //xoa nhieu du lieu
        var $list_action = $('.list_action'); //tim toi the co class = list_action
        $list_action.find('#submit').click(function() { //tim toi the co id = submit,su kien click
            if (!confirm('Bạn chắc chắn muốn xóa tất cả dữ liệu ?')) {
                return false;
            }

            var ids = new Array();
            $('[name="id[]"]:checked').each(function() {
                ids.push($(this).val());
            });

            if (!ids.length) return false;

            //link xoa du lieu
            var url = $(this).attr('url');
            //ajax để xóa
            $.ajax({
                url: url,
                type: 'POST',
                data: { 'ids': ids },
                success: function() {
                    $(ids).each(function(id, val) {
                        //xoa cac the <tr> chua danh muc tung ung
                        $('tr.row_' + val).fadeOut();
                    });
                }

            })
            return false;
        });

        // Form filter handle
        var form = $('form[name=filter]');

        form.find('.view_of_field').click(function() {
            var param = $(this).attr('_param');
            var value = $(this).attr('_value');

            form.find('[name=' + param + ']').val(value);
            form.submit();

            return false;
        });


        // Load uri
        var uri = window.location.href.split('#uri=');
        if (uri[1]) {
            $.colorbox({
                href: admin_url + uri[1],
                opacity: 0.75
            });
        }

        $('.load_uri').click(function() {
            var uri = $(this).attr('_url');
            uri = (!uri) ? $(this).attr('href') : uri;
            uri = uri.replace(admin_url, '');

            window.location.href = '#uri=' + uri;
        });
        c_num();
    });

})(jQuery);

//####################################################
// Main function
//####################################################

/**
 * Chuyen tieng viet khong dau
 */
// function convert_vi_to_en(str) {
//     str = str.toLowerCase();
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
//     /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
//     str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1- 
//     str = str.replace(/^\-+|\-+$/g, "");
//     //cắt bỏ ký tự - ở đầu và cuối chuỗi  
//     return str;
// }



/**
 * An pages khi ko co chia trang
 */
// function auto_check_pages(t) {
//     if (t.find('a')[0] == undefined) {
//         t.remove();
//     }
// }

function c_num() {
    var ul_li = document.querySelectorAll('#menu li ul.sub');
    var l = new Array;
    for (let i = 1; i <= ul_li.length; i++) {
        l[i] = document.getElementById("ul_" + i).children.length;
        document.getElementById('str_' + i).innerHTML = l[i];
    }


}
/**
 * Tim kiem va thay the chuoi
 */
// function str_replace(search, replace, subject, count) {

//     var i = 0,
//         j = 0,
//         temp = '',
//         repl = '',
//         sl = 0,
//         fl = 0,
//         f = [].concat(search),
//         r = [].concat(replace),
//         s = subject,
//         ra = Object.prototype.toString.call(r) === '[object Array]',
//         sa = Object.prototype.toString.call(s) === '[object Array]';
//     s = [].concat(s);
//     if (count) {
//         this.window[count] = 0;
//     }

//     for (i = 0, sl = s.length; i < sl; i++) {
//         if (s[i] === '') {
//             continue;
//         }
//         for (j = 0, fl = f.length; j < fl; j++) {
//             temp = s[i] + '';
//             repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
//             s[i] = (temp).split(f[j]).join(repl);
//             if (count && s[i] !== temp) {
//                 this.window[count] += (temp.length - s[i].length) / f[j].length;
//             }
//         }
//     }
//     return sa ? s : s[0];
// }
// select