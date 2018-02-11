var drinkMachine = {
  init : function () {
    this.product = { // 상품 초기값 세팅
      'coke'   : {cnt :  1, price : 1500},
      'sprite' : {cnt :  0, price : 1300},
      'fanta'  : {cnt :  3, price :  900},
      'milkis' : {cnt :  2, price : 2100},
      'water'  : {cnt : 10, price :  400},
    };

    this.event();
    this.setSaleProduct(0); // 상품 상태 업데이트
    this.setAmount(); // 투입금액 업데이트
  },
  event : function () { // 기본 이벤트 함수
    var self = drinkMachine;

    $('.money_group button').on('click', function () { // 투입금액 버튼 클릭 이벤트
      var amount = parseInt($('#input_money').val()); // 이미 투입된 금액
      var unit   = parseInt($(this).data('unit')); // 새로 투입한 금액
      var total  = amount + unit; // 금액 합계

      if(total <= 5000){ // 5,000원까지 투입 가능
          $('#input_money').val(total); // input value 업데이트

          self.setAmount(); // 투입금액 업데이트
          self.setSaleProduct(total); // 상품 상태 업데이트
      }else{
          alert('투입금액은 최대 5,000원까지 가능합니다'); // 투입 한도 초과 시 alert
      }
    });
  },
  setSaleProduct : function (amount) { // 상품 상태 업데이트 함수
    var self = drinkMachine;

    $('.product').find('button').removeClass('btn-success btn-danger').removeAttr('disabled'); // btn 초기화

    for (var _prd in self.product) {
      var _cnt   = self.product[_prd]['cnt'];
      var _price = self.product[_prd]['price'];
      var $btn   = $('.product_'+_prd).find('button');
      if(_cnt == 0){
        $btn.addClass('btn-danger').attr('disabled', 'disabled');
      }else if (_price <= amount) {
        $btn.addClass('btn-success');
      }
    }
  },
  setAmount : function () { // 투입금액 업데이트 함수
    var amount = $('#input_money').val();

    $('.amount').text(new Intl.NumberFormat().format(amount)); // 1,000 단위 구분 기호 세팅
  }
};

$(document).ready(function () {
  drinkMachine.init();
});
