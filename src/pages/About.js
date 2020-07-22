import React, { Component } from 'react';
import bannerImg from '../assets/banner.png';

class About extends Component {
  render() {
    document.title = "Giới thiệu";
    return (
      <div className="clo-md-9">
        <div className="row" style={{textAlign: 'center'}}>
          <img src={bannerImg} alt="banner" width="100%" style={{marginLeft: '10px'}} />
        </div>
        <div className="fusion-text" style={{marginTop: '35px'}}>
          <h2 style={{textAlign: 'center'}}><span style={{color: '#ff0000'}}><strong>DỊCH VỤ CHO THUÊ XE MÁY </strong></span></h2>
        </div>
        <div className="fusion-sep-clear" />
        <div className="fusion-separator sep-single sep-solid" style={{borderColor: '#e2e3e8', borderTopWidth: '3px', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', marginBottom: '35px', width: '100%', maxWidth: '170px', textAlign: 'center'}}>
          <span className="icon-wrapper" style={{borderColor: '#e2e3e8', backgroundColor: 'rgba(255,255,255,0)'}}>		
            <i className=" fa fa-angle-double-down" style={{color: '#e2e3e8'}} />
          </span>
        </div>
        <div className="fusion-text" style={{marginTop: '25px', marginLeft: '30px', marginRight: '30px'}}>
          <p>
            <span style={{color: '#333399'}}><strong><em>Cho thuê xe máy giá rẻ, cho thuê xe máy EzrentBikes</em></strong></span>
            <span style={{color: '#003300'}}> xin trân trọng giới thiệu dịch vụ tiện ích cho khách du lịch, những người đến công tác tại TP.HCM </span>
            <span style={{color: '#333399'}}><em><strong>Cho thuê xe máy EzrentBikes</strong></em> </span>
            <span style={{color: '#003300'}}>mong rằng sẽ đem lại những tiện ích nhất khi quý khách hàng đến du lịch và công tác tại TP.HCM, nhằm mục đích thuận tiện, tiết kiệm chi phí đi lại và tự chủ trong mọi tình huống.</span></p>
        </div>
        <div className="fusion-text " style={{marginTop: '25px', marginLeft: '30px', marginRight: '30px'}}>
          <p>
            <span style={{color: '#003300'}}>Đối với người Việt Nam, xe máy là phương tiện đi lại phổ biến nhất của hầu như tất cả mọi người. Còn đối với khách du lịch, đặc biệt là người nước ngoài họ rất thích và cảm thấy tuyệt nếu được tự mình cầm lái đi trên các cung đường đẹp tại Việt Nam, trải nghiệm và khám phá nhiều phong tục tập quán và nhiều vùng quê đầy thơ mộng của đất nước xinh đẹp và mến khách này. Còn đối với người bản địa vì lý do nào đó bạn không có nó, bạn cần nó trong chuyến công tác dài ngày của mình. Hãy liên hệ với chúng tôi</span>
            <span style={{color: '#333399'}}><em><strong>Dịch vụ cho thuê xe máy tại TP.HCM</strong></em></span> <span style={{color: '#003300'}}>sớm có thể để được phục vụ.</span>
          </p>
        </div>
        <div className="fusion-text" style={{marginTop: '25px', marginLeft: '30px', marginRight: '30px'}}>
          <p>
            <span style={{color: '#003300'}}><strong>Website</strong></span>
            <span style={{color: '#ff0000'}}><strong><a href="/" target="_blank" rel="noopener noreferrer" style={{color: '#ff0000'}}> Thuê Xe EzrentBikes </a> </strong></span>
          </p>
        </div>
        <div className="fusion-text" style={{marginTop: '25px', marginLeft: '30px', marginRight: '30px'}}>
          <div>
            <span style={{color: '#000000'}}><strong>Mô tả:</strong></span>
          </div>
          <div>
            <span style={{color: '#333399'}}><em><strong>Dịch vụ cho thuê xe máy EzrentBikes </strong></em></span> 
            <span style={{color: '#003300'}}>phục vụ khách hàng trong và ngoài nước thuê xe gắn máy, thủ tục đơn giản nhanh chóng, cho thuê theo ngày, tuần, tháng và dài hạn, có giao xe tận nơi</span></div>
          <div>
            <strong>Liên hệ: </strong>
            <span style={{color: '#ff0000'}}><strong>- 093.802.9040</strong><strong><span style={{color: '#333399'}}> (Mr. Tuấn)</span></strong></span>
            <div>
              <strong>
                <span style={{color: '#333300'}}>Email:</span>
                <span style={{color: '#333399'}}>casaumayman1@gmail.com</span>
              </strong>
            </div>
            <div>
              <strong>Địa chỉ:</strong>
              <span style={{color: '#333399'}}><strong> Số 475A Điện Biên Phủ, Phường 25, quận Bình Thạnh, Hồ Chí Minh, Việt Nam, Châu Á, Trái Đất, Hệ Mặt Trời thứ 9, thiên hà Galaxy</strong></span>
            </div>
            <div>
              <span style={{color: '#333399'}}><em><strong>Dịch vụ cho thuê xe máy EzrentBikes</strong> </em></span>
              <span style={{color: '#333300'}}>cho thuê xe số, xe ga đời mới, giá cạnh tranh, thủ tục đơn giản, nhanh chóng</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About;