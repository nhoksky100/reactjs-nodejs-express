import React, { Component } from 'react';

class LocationSearch extends Component {
  constructor(props) {
    super(props);

    this.locationInfo = {
      geo: null,
      country: null,
      state: null,
      city: null,
      postalCode: null,
      street: null,
      streetNumber: null,
    };
  }

  resetLocationInfo() {
    this.locationInfo = {
      geo: null,
      country: null,
      state: null,
      city: null,
      postalCode: null,
      street: null,
      streetNumber: null,
    };
  }

  handlePlaceChanged() {
    if (window.google && window.google.maps) {
      const { google } = window;
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('address')
      );
      autocomplete.setTypes(['geocode']);

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        const address = place.address_components;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.resetLocationInfo();

        this.locationInfo.geo = [lat, lng];
        for (let i = 0; i < address.length; i++) {
          const component = address[i].types[0];
          switch (component) {
            case 'country':
              this.locationInfo.country = address[i]['long_name'];
              break;
            case 'administrative_area_level_1':
              this.locationInfo.state = address[i]['long_name'];
              break;
            case 'locality':
              this.locationInfo.city = address[i]['long_name'];
              break;
            case 'postal_code':
              this.locationInfo.postalCode = address[i]['long_name'];
              break;
            case 'route':
              this.locationInfo.street = address[i]['long_name'];
              break;
            case 'street_number':
              this.locationInfo.streetNumber = address[i]['long_name'];
              break;
            default:
              break;
          }
        }

        // Preview map.
        const  src = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCMST7WB3_rS_kPKqvjqnDry-nUrgN5bd4&center=${lat},${lng}&zoom=14&size=480x125&maptype=roadmap&sensor=false`;
        const img = document.createElement('img');
        img.src = src;
        img.className = 'absolute top-0 left-0 z-20';
        document.getElementById('js-preview-map').appendChild(img);

        // Preview JSON output.
        document.getElementById('js-preview-json').innerHTML = JSON.stringify(
          this.locationInfo,
          null,
          4
        );
      });
    } else {
      console.log('loi load map');
      // Nếu không tồn tại, có thể hiển thị thông báo lỗi hoặc xử lý khác tùy ý.
    }

  }

  componentDidMount() {
    // Attach listener to address input field.
    // this.handlePlaceChanged();
  }

  render() {
    return (
       <div>

         <div class="flex justify-center p-8">
           <div class="max-w-sm bg-white shadow-lg rounded overflow-hidden">
             <div class="w-full relative" id="js-preview-map"><img async src="https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCMST7WB3_rS_kPKqvjqnDry-nUrgN5bd4&center=52.5219216,13.4110207&amp;zoom=12&amp;size=480x125&amp;maptype=roadmap&amp;sensor=false" width="480" height="125" alt="Google Maps Berlin"/></div>
             <div class="w-full float-left border-b-2 border-gray-400 px-6 py-4">
               <label class="block text-gray-700 text-sm w-full font-semibold mb-2">Address:</label>
               <input class="w-full bg-gray-200 text-gray-700 appearance-none rounded border-2 border-gray-300 py-2 px-4" id="address" type="text"/>
             </div>
             <pre class="w-full bg-gray-200 text-blue-900 float-left px-6 py-4"><code id="js-preview-json"></code></pre>
           </div>
         </div>
         <div class="text-gray-600 text-xs text-center py-2 px-3 fixed bottom-0 right-0 z-10">Made by <a href="https://hofmannsven.com" target="_blank" rel="external noopener">Sven Hofmann</a>.</div>
   
       </div>
      // <div>
      //   <input type="text" id="address" />
      //   <div id="js-preview-map"></div>
      //   <pre id="js-preview-json"></pre>
      // </div>
    )
  }
}

export default LocationSearch;
