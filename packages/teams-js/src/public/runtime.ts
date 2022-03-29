/* eslint-disable @typescript-eslint/ban-types */

import { deepFreeze } from '../internal/utils';
export interface IRuntime {
  readonly apiVersion: number;
  readonly isLegacyTeams?: boolean;
  readonly supports: {
    readonly audioDevice?: {};
    readonly appInstallDialog?: {};
    readonly appEntity?: {};
    readonly bot?: {};
    readonly calendar?: {};
    readonly call?: {};
    readonly chat?: {};
    readonly dialog?: {
      readonly bot?: {};
      readonly update?: {};
    };
    readonly files?: {};
    readonly location?: {
      readonly map?: {};
    };
    readonly logs?: {};
    readonly mail?: {};
    readonly media?: {
      readonly camera?: {
        readonly barcode?: {};
      };
    };
    readonly meeting?: {};
    readonly meetingRoom?: {};
    readonly menus?: {};
    readonly monetization?: {};
    readonly notifications?: {};
    readonly pages?: {
      readonly appButton?: {};
      readonly tabs?: {};
      readonly config?: {};
      readonly backStack?: {};
      readonly fullTrust?: {};
    };
    readonly people?: {};
    readonly remoteCamera?: {};
    readonly sharing?: {};
    readonly teams?: {
      readonly fullTrust?: {};
    };
    readonly teamsCore?: {};
    readonly video?: {};
    readonly videoDevice?: {};
  };
}

export let runtime: IRuntime = {
  apiVersion: 1,
  supports: {
    appInstallDialog: undefined,
    audioDevice: undefined,
    bot: undefined,
    calendar: undefined,
    call: undefined,
    chat: undefined,
    dialog: {
      bot: undefined,
      update: undefined,
    },
    location: {
      map: undefined,
    },
    logs: undefined,
    mail: undefined,
    media: {
      camera: {
        barcode: undefined,
      },
    },
    meeting: undefined,
    meetingRoom: undefined,
    menus: undefined,
    monetization: undefined,
    notifications: undefined,
    pages: {
      appButton: undefined,
      tabs: undefined,
      config: undefined,
      backStack: undefined,
      fullTrust: undefined,
    },
    people: undefined,
    remoteCamera: undefined,
    sharing: undefined,
    teams: {
      fullTrust: undefined,
    },
    teamsCore: undefined,
    video: undefined,
    videoDevice: undefined,
  },
};

export const teamsRuntimeConfig: IRuntime = {
  apiVersion: 1,
  isLegacyTeams: true,
  supports: {
    appInstallDialog: {},
    appEntity: {},
    audioDevice: {},
    bot: {},
    call: {},
    chat: {},
    dialog: {
      bot: {},
      update: {},
    },
    files: {},
    location: {
      map: {},
    },
    logs: {},
    media: {
      camera: {
        barcode: {},
      },
    },
    meeting: {},
    meetingRoom: {},
    menus: {},
    monetization: {},
    notifications: {},
    pages: {
      appButton: {},
      tabs: {},
      config: {},
      backStack: {},
      fullTrust: {},
    },
    people: {},
    remoteCamera: {},
    sharing: {},
    teams: {
      fullTrust: {},
    },
    teamsCore: {},
    video: {},
    videoDevice: {},
  },
};

export function applyRuntimeConfig(runtimeConfig: IRuntime): void {
  runtime = deepFreeze(runtimeConfig);
}
