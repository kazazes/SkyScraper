/**
 * Augment the typings of Vue.js
 */

import Vue, { ComponentOptions } from "vue";
import { CookieAttributes } from "js-cookie";
import LocalForage from "localforage";
import { Store } from "vuex/types/index";

// todo: context?
interface StorageCookieOptions extends CookieAttributes {
  cookie: {
    prefix: string;
    options?: StorageCookieOptions;
  };
}
interface Storage {
  setUniversal(key: string, value: any, isJson?: boolean): string;
  getUniversal(key: string, isJson?: boolean): any;
  syncUniversal(key: string, defaultValue: any, isJson?: boolean): any;
  // Local State
  setState(key: string, val: any): string;
  getState(key: string): string;
  watchState(key: string, handler: (newValue: any) => void);
  // Cookies
  setCookie(key: string, val: any, options?: StorageCookieOptions);
  getCookie(key: string, isJson?: boolean): any;
  // Local Storage
  setLocalStorage(key: string, val: any, isJson?: boolean);
  getLocalStorage(key: string, isJson?: boolean): any;
}

interface Auth<T = any> {
  ctx: any;
  $state: any; // todo: type this
  $storage: Storage;
  user: Partial<T>;
  loggedIn: boolean;
  loginWith(strategyName: string, ...args): Promise<never>;
  login(...args): Promise<never>;
  logout(): Promise<never>;
  fetchUser(): Promise<never>;
  fetchUserOnce(): Promise<never>;
  hasScope(scopeName: string): boolean;
  setToken(strategyName: string, token?: string): string;
  syncToken(strategyName: string): string;
  onError(handler: (error: Error, name: string, endpoint: any) => void);
  setUser(user?: Partial<T>);
  reset(): Promise<never>;
  redirect(name: string);
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
    sockets?: any;
    apollo?: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: Auth<any>;
    $connect: any;
    $store: Store<any>;
    $apollo: any;
    $apolloHelpers: any;
  }
}

declare global {
  interface Window { localforage: LocalForage; }
}

