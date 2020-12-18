import { LOGIN_ENDPOINT, TOKEN, USER_AGENT } from '../config';

export interface LoginData {
  name: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
}

const getHeaders = (): Headers => {
  const headers = new Headers([
    ['User-Agent', USER_AGENT],
    ['Content-Type', 'application/json'],
    ['Accept', 'application/json'],
    ['Accept-Language', 'de-DE']
  ]);
  if (TOKEN) {
    console.log('Fetch.tsx:using TOKEN: ', TOKEN);
    headers.set('authorization', `Bearer ${TOKEN}`);
  }
  return headers;
};

export const login = async (
  email: string | undefined,
  password: string | undefined
): Promise<LoginData | undefined> => {
  if (!email || !password) {
    console.error(
      'You must fill email and password or access_token and user_id'
    );
    return;
  }

  try {
    let response;
    // eslint-disable-next-line no-constant-condition
    if (false) {
      response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          device_type: 'UNKNOWN',
          email,
          password
        })
      });
      console.log('Fetch.tsx:50: response: ', response);
    } else {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 5000);
      });
      response = {
        status: 200,
        statusText: 'Fake',
        json: () => ({
          access_token: 'bla',
          refresh_token: 'blub',
          startup_data: {
            user: {
              user_id: '123',
              name: 'Jochen',
              country_id: 'DE',
              email: 'asdf@.de',
              phone_country_code: '',
              phone_number: '',
              role: 'CONSUMER',
              is_partner: false,
              newsletter_opt_in: false,
              push_notifications_opt_in: true
            },
            app_settings: {
              countries: [
                {
                  country_iso_code: 'DE',
                  terms_url: 'https://toogoodtogo.de/de/terms-and-conditions',
                  privacy_url: 'https://toogoodtogo.de/de/privacy-policy'
                }
              ],
              purchase_rating_start: '06:00:00',
              purchase_rating_end: '23:00:00',
              purchase_rating_delay: 5400
            },
            user_settings: {
              country_iso_code: 'DE',
              phone_country_code_suggestion: '49',
              is_user_email_verified: true,
              terms_url: 'https://toogoodtogo.de/de/terms-and-conditions',
              privacy_url: 'https://toogoodtogo.de/de/privacy-policy',
              contact_form_url: 'https://toogoodtogo.de/de/support/consumer',
              blog_url: 'https://toogoodtogo.de/de/blog',
              careers_url: 'https://toogoodtogo.org/en/careers',
              education_url: 'https://toogoodtogo.de/de/movement/education',
              instagram_url: 'https://www.instagram.com/toogoodtogo.de',
              store_signup_url:
                'https://toogoodtogo.de/de/business?webview=1&utm_medium=App&utm_source=App&utm_campaign=',
              store_contact_url: 'https://toogoodtogo.de/de/support/business',
              bound_sw: {
                longitude: 123,
                latitude: 123
              },
              bound_ne: {
                longitude: 123,
                latitude: 123
              },
              meals_saved: {
                country_iso_code: 'DE',
                share_url: 'https://share.toogoodtogo.com/mealssaved',
                image_url:
                  'https://store.toogoodtogo.com/web/resource/v2/sharing/mealsSaved',
                meals_saved_last_month: 295369,
                month: 11,
                year: 2020
              },
              has_any_vouchers: false
            },
            orders: {
              current_time: '2020-12-18T14:08:35.951052Z',
              has_more: false,
              orders: []
            },
            vouchers: {
              vouchers: []
            }
          }
        })
      };
      console.warn('Fetch.tsx:127: : \n\n Fake Response!\n\n\n');
    }

    if (response.status !== 200) {
      throw new Error(
        `Login failed with status ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    return {
      name: json.startup_data.user.name,
      user_id: json.startup_data.user.user_id,
      access_token: json.access_token,
      refresh_token: json.refresh_token
    };
  } catch (e) {
    console.error('Fetch.tsx:63: e: ', e);
  }
  return undefined;
};
