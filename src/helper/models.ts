export interface Token {
  access_token: string;
  refresh_token: string;
  refresh_time: Date;
}

export interface Session extends Token {
  startup_data: {
    app_settings: {
      // more
    };
    user: {
      email: string;
      name: string;
      user_id: string;
      // more
    };
    user_settings: {
      // more
      bound_sw: {
        longitude: number;
        latitude: number;
      };
      bound_ne: {
        longitude: number;
        latitude: number;
      };
    };
    orders: {
      // more
    };
    vouchers: {
      // more
    };
  };
}

export interface Location {
  longitude: number;
  latitude: number;
}
export interface Item {
  display_name: string;
  distance: number;
  item: {
    description: string;
    name: string;
    // more
  };
  pickup_location: {
    address: {
      // more
      address_line: string;
    };
    location: Location;
  };
  store: {
    store_name: string;
    // more
  };
}

export interface ItemSearchCriteria {
  favorites_only: boolean;
  origin: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}
