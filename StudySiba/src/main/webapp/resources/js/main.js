$(document).ready(function () {
	//상단 아이콘 HOVER 색상 반응
    iconDecoration();
    //푸터 아이콘 클릭 처리
    footerIconClick();
    //모달창 보이기
    modalShow();
    //회원가입 이미지 변경 버튼 클릭시
    chooseBtn();
    //회원가입 이미지 변경 로직
    chooseProfile();
    //소셜 로그인 버튼 클릭
    socialLogin();
    //회원가입 처리
    joinFunction();
    // 입력값 validation 체크
    inputValueCheck();
    // 모달종료시 액션
    closeJoinModal();
    // 닉네임변경
    nickCheck();
    // 드래그앤드롭 이미지
    drageImage();
    // 툴팁 뷰
    $('[data-toggle="tooltip"]').tooltip();   
});

//selector 캐싱
var $c = function (qr, force) {
    if (!$c.dt) {
        $c.dt = {};
    }
    if (!$c.dt[qr] || force) {
        $c.dt[qr] = $(qr);
    }
    return $c.dt[qr];
};

/*  console.time('t1');
      for (let i = 0; i < 100000; i++) {
         $c;
      }
      console.timeEnd('t1');*/

//페이지 이동
function movePath(path) {
    location.href = path;
}

//새창 페이지 이동
function moveNewPath(path) {
    window.open(path, '_blank');
}

//상단 아이콘 HOVER 색상 반응
function iconDecoration() {
    $c('.menu-icon, .menu-dropicon, .menu-pre').hover(
        function () {
            $(this).css('color', 'white');
            if ($(this).attr('data') == 'messageModal') {
                $(this).removeClass('fa fa-envelope');
                $(this).addClass('fas fa-envelope-open');
            }
        },
        function () {
            $(this).css('color', '#9a9da0');
            if ($(this).attr('data') == 'messageModal') {
                $(this).removeClass('fas fa-envelope-open');
                $(this).addClass('fa fa-envelope');
            }
        });
}

//푸터 아이콘 클릭 처리
function footerIconClick() {
    $c('.footer-icons').on('click', function () {
        var path = '';
        var value = $(this).attr('id');
        if (value == 'mail') {
            path = 'mailto:bytrustu@gmail.com';
        } else if (value == 'fb') {
            path = 'https://www.facebook.com/choddol';
        } else if (value == 'git') {
            path = 'https://github.com/bytrustu';
        }
        movePath(path);
    });
}

//모달창 보이기
function modalShow() {
	$('body, nav, .modal').addClass('modal-nopadding');
	$('body, .modal').addClass('modal-nooverflow');
	$(".joinmodal_choose").css({"top": "-50%", "left": "290%"});
    $c('.modal_open').on('click', function () {
        var value = $(this).attr('data');
        $('#' + value).modal('show');
        if ( value == 'joinModal' ) {
        	$('.joinmodal_joinid').focus();
            swing();
        } else if ( value == 'modifyModal' ) {
        	$('.modifymodal_nick').focus();
        }
    });
}

//모달종료시 액션
function closeJoinModal() {
	$('#joinModal').on('hidden.bs.modal, hide.bs.modal', function(e){
		e.stopImmediatePropagation();
			console.log('hide modal');
			$('.joinmodal_choose').stop();
			$('.joinmodal_choose').css({
				'top':'-50%',
				'left':'290%'
			});
	});
}

//로그인 버튼
function loginBtn(){
	$c('.loginmodal_loginbtn').on('click', function(){
		$('#loginForm').submit();
	});
}


//회원가입 이미지 변경 아이콘 움직임
function swing() {
    $c('.joinmodal_choose').animate({
        'top': '4%',
        'left': '57%'
    }, 600).animate({
        'top': '7%',
        'left': '52%'
    }, 600, swing);
}

//소셜 회원가입 이미지 변경 아이콘 움직임
function socialSwing() {
    $c('.social_choose').animate({
        'top': '22%',
        'left': '51%'
    }, 600).animate({
        'top': '20%',
        'left': '52%'
    }, 600, socialSwing);
}

//회원가입 이미지 변경 버튼 클릭시
function chooseBtn() {
    $c('.joinmodal_choose, .social_choose').on('click', function () {
        chooseProfile();
    });
}

//회원가입 이미지 변경 로직
function chooseProfile() {
    var path = '/images/profile/kakao/'
    var result = Math.floor(Math.random() * 40) + 1;
    var profile = 'kakao-' + result + '.png';
    $c('.joinmodal_image').attr('src', path + profile);
    $('input[name=proFile]').val(profile);
}

//소셜 로그인 버튼 클릭
function socialLogin() {
    $c('.content_socialicon').on('click', function () {
        var value = $(this).attr('data');

        if (value == 'google' || value == 'naver') {
            return;
        } else if (value == 'facebook') {
            FB.login(function (response) {
                checkFacebookLoginStatus(response);
            });
        } else if (value = 'kakao') {
            kakaoLogin();
        }
    });
}

// 모달 X버튼 클릭시
function socialClose() {
    $c('.social-close').on('click', function () {
        movePath("/");
    });
}

//회원가입 처리
function joinFunction() {
    $c('.joinmodal_joinbtn').on('click', function () {
    	
        var div = $(this).attr('data');
        if ($('.validation_final').attr('data') == 'false') {
            Swal({
                type: 'error',
                title: '회원가입실패',
                text: '입력사항을 확인 해주세요.'
            })
            return;
        }
        $('#joinForm').attr('action', '/member/join');
        $('#joinForm').submit();
    });
}

//소셜 회원가입 입력값 확인
function inputValueCheck() {

    var exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    var idSelector = $('#idChecker');
    var passSelector = $('#passChecker');
    var nickSelector = $('#nickChecker');
    var eMailSelector = $('#eMailChecker');
    var passwordSelector = $('#passChecker');
    var passComfirmSelector = $('#passConfirmChecker');
    var idInput = $('#socialJoinId');
    var passInput = $('#socialJoinPass');
    var nickInput = $('#socialJoinNick');
    var eMailInput = $('#socialJoinEmail');

    $('#socialJoinId').focus();
    $('.social_input').keyup(function () {

        var inputName = $(this).attr('name');
        var inputLength = new Object();

        if ($(this).attr('name') == 'id') {
            inputLength.id = $('#socialJoinId').val().length;
        } else if ($(this).attr('name') == 'pass') {
            inputLength.pass = $('#socialJoinPass').val().length;
        } else if ($(this).attr('name') == 'nick') {
            inputLength.nick = $('#socialJoinNick').val().length;
        }

        
        if (inputName == 'id') {
            changeCheckView(inputName, 3, inputLength.id, idSelector);
        } else if (inputName == 'pass') {
            changeCheckView(inputName, 3, inputLength.pass, passSelector);
        } else if (inputName == 'nick') {
            changeCheckView(inputName, 0, inputLength.nick, nickSelector);
        } else if (inputName == 'eMail') {
            changeCheckView(inputName, 0, 0, eMailSelector);
        }

        function changeCheckView(type, index, length, selector) {
            if (type == 'eMail') {
                if (inputName == type && exp.test($('#socialJoinEmail').val()) == true && selector.attr('data') == 'false') {
                    changeTrueView(selector);
                } else if (inputName == type && exp.test($('#socialJoinEmail').val()) == false) {
                    changeFalseView(selector);
                }
            } else {
                if (inputName == type && length > index && (selector.attr('data') == 'false' || selector.attr('data') == 'true')) {
                    changeTrueView(selector);
                } else if (inputName == type && length <= index) {
                    changeFalseView(selector);
                }
            }
        }

    });

    if ($('#joinType').val() == 'normal') {
        idSelector.on('click', function () {
            checkRedu(idSelector, idInput, passInput, '아이디', 'id', $('#socialJoinId').val());
        });
        passSelector.on('click', function () {
            checkRedu(passSelector, passInput, nickInput, '비밀번호', 'pass', $('#socialJoinPass').val());
        });
        nickSelector.on('click', function () {
            checkRedu(nickSelector, nickInput, eMailInput, '닉네임', 'nick', $('#socialJoinNick').val());
        });
        eMailSelector.on('click', function () {
            checkRedu(eMailSelector, eMailInput, null, '이메일', 'eMail', $('#socialJoinEmail').val());
        });
    } else {
        idSelector.on('click', function () {
            checkRedu(idSelector, idInput, nickInput, '아이디', 'id', $('#socialJoinId').val());
        });
        nickSelector.on('click', function () {
            checkRedu(nickSelector, nickInput, eMailInput, '닉네임', 'nick', $('#socialJoinNick').val());
        });
        eMailSelector.on('click', function () {
            checkRedu(eMailSelector, eMailInput, null, '이메일', 'eMail', $('#socialJoinEmail').val());
        });
    }


}


//확인버튼 : 중복확인
function changeTrueView(selector) {
    selector.removeClass('btn-warning');
    selector.addClass('btn-success');
    selector.attr('data', 'true');
    console.log(selector);
    if (selector.attr('id') == 'passChecker') {
        selector.html('변경확인');
    } else {
        selector.html('중복확인');
    }
}

//확인버튼 : 불가능
function changeFalseView(selector) {
    selector.removeClass('btn-success');
    selector.addClass('btn-warning');
    selector.attr('data', 'false');
    selector.html('불가능');
}

//중복확인 로직
function checkRedu(btnSelector, preSeletor, lastSelector, text, type, value) {

    var result = '';
    if (type != 'pass') {
        result = validationCheck(type, value);
    } else {
        result = 'false';
    }

    if (result == 'false') {

        if (btnSelector.attr('data') == 'true') {
            Swal({
                title: '사용가능',
                text: text + '를 확정 하시겠습니까?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네, 확인!',
                cancelButtonText: '아니요'
            }).then((result) => {
                if (result.value) {
                    Swal(
                        '승인',
                        text + ' 지정 되었습니다.',
                        'success'
                    )
                    btnSelector.attr('data', 'success');
                    btnSelector.removeClass('btn-success');
                    btnSelector.addClass('btn-primary');
                    btnSelector.html('승인');
                    preSeletor.addClass('validation_readonly');
                    preSeletor.attr('readOnly', 'true');
                    if (lastSelector != null) {
                        lastSelector.removeAttr('readOnly');
                        lastSelector.removeClass('validation_readonly');
                        lastSelector.focus();
                    }

                    if ($c('#joinType').val() == 'facebook') {
                        if ($('#idChecker').attr('data') == 'success' && $('#nickChecker').attr('data') == 'success') {
                            final();
                        }
                    } else if ($c('#joinType').val() == 'google' || $c('#joinType').val() == 'kakao') {
                        if ($('#idChecker').attr('data') == 'success' && $('#nickChecker').attr('data') == 'success' && $('#eMailChecker').attr('data') == 'success') {
                            final();
                        }
                    } else if ($c('#joinType').val() == 'normal') {
                        if ($('#idChecker').attr('data') == 'success' && $('#passChecker').attr('data') == 'success' && $('#nickChecker').attr('data') == 'success' && $('#eMailChecker').attr('data') == 'success') {
                            final();
                        }
                    }

                    function final() {
                        $c('.validation_final').removeClass('btn-danger');
                        $c('.validation_final').addClass('btn-primary');
                        $c('.validation_final').attr('data', 'true');
                        $c('.validation_final').html('승인');
                        $('.joinmodal_joinbtn').removeClass('btn-danger');
                        $('.joinmodal_joinbtn').addClass('btn-primary');
                    }
                }
            })
        }
        // end if

    } else if (result == 'true') {
        Swal(
            '사용불가',
            '이미 사용중인 ' + text + ' 입니다.',
            'error'
        )
    }
    // end on
}


//입력값 중복 확인값 리턴
function validationCheck(type, value) {
    var result = '';
    $.ajax({
        type: 'POST',
        url: '/member/validationCheck',
        data: {
            type: type,
            value: value
        },
        async: false,
        success: function (data) {
            result = data;
        },
        error: function () {
            console.log('validationCheck Function Error');
        }
    });
    return result;
}

//닉네임변경
function nickCheck(){
	$('.modifymodal_modifybtn').on('click', function(){
		var nick = $('.modifymodal_nick').val();
		$.ajax({
			type : 'POST',
			url : '/member/checkNick',
			data : {
				nick : nick
			} ,
			success : function(callback){
				console.log(callback);
				if ( callback == 'false' ) {
					$('#nickForm').submit();
				} else if ( callback == 'true' ) {
					Swal('사용불가','이미 사용중인 닉네임 입니다.','error');
				} else if ( callback == 'emptyValue' ) {
					Swal('사용불가','닉네임을 입력 해 주세요.','error');
				}
			}
		});
	});
}

//드래그앤드롭 이미지
function drageImage(){
	$(function () {
	     var obj = $("#profileImage");
	     var image = '';

	     obj.on('dragenter', function (e) {
	          e.stopPropagation();
	          e.preventDefault();
	          image = $(this).attr('src');
	          $(this).attr('src', '/images/main/loading.gif');
	     });

	     obj.on('dragleave', function (e) {
	          e.stopPropagation();
	          e.preventDefault();
	          obj.attr('src', image);
	          $(this).css('border', '1px solid transparent');
	     });

	     obj.on('dragover', function (e) {
	          e.stopPropagation();
	          e.preventDefault();
	     });

	     obj.on('drop', function (e) {
	          e.preventDefault();
	          $(this).css('border', '1px solid transparent');

	          var files = e.originalEvent.dataTransfer.files;
	          var file = files[0];
	          console.log(file);
	          uploadFile(file, "profile");
	     });
	});
}

//파일 업로드
function uploadFile(file, type) {
	var formData = new FormData();
	formData.append("file", file);
	formData.append("type", type);
         $.ajax({
        	type: 'POST',
            url: '/upload',
            data: formData,
            dataType: 'text',
            processData: false,
            contentType: false,
            success: function(callback) {
            	$("#profileImage").attr('src',  '/local_upload/'+ type + '/' +callback);
                Swal('정보변경', '프로필 사진이 변경 되었습니다.', 'success');
            }
         });
}