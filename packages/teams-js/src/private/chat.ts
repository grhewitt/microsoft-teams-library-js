import {
  sendAndHandleStatusAndReason as sendAndHandleError,
  sendAndUnwrap,
  sendMessageToParent,
} from '../internal/communication';
import { registerHandler, removeHandler } from '../internal/handlers';
import { ensureInitialized } from '../internal/internalAPIs';
import { FrameContexts } from '../public/constants';
import { OpenChatRequest, OpenConversationRequest, OpenGroupChatRequest } from '../public/interfaces';
import { runtime } from '../public/runtime';
import { ChatMembersInformation } from './interfaces';

/**
 * @hidden
 * Namespace to interact with the conversational subEntities inside the tab
 *
 * @alpha
 */
export namespace chat {
  /**
   *
   * Allows the user to start a direct chat with a user
   * @members = length 1
   * @returns Promise resolved upon completion
   */

  export function openChat(openChatRequest: OpenChatRequest): Promise<void> {
    return new Promise<void>(resolve => {
      if (openChatRequest.members.length !== 1) {
        throw Error('Incorrect number of users for openChat');
      }
      ensureInitialized(FrameContexts.content);
      const sendPromise = sendAndHandleError('chat.openChat', {
        members: openChatRequest.members,
        message: openChatRequest.message,
      });
      resolve(sendPromise);
    });
  }

  /**
   *
   * Allows the user to start a direct chat with 2 or more users
   * @members = length 2+
   * @returns Promise resolved upon completion
   */

  export function openGroupChat(openChatRequest: OpenGroupChatRequest): Promise<void> {
    return new Promise<void>(resolve => {
      if (openChatRequest.members.length <= 1) {
        throw Error('Incorrect number of users for openGroupChat');
      }
      ensureInitialized(FrameContexts.content);
      const sendPromise = sendAndHandleError('chat.openChat', {
        members: openChatRequest.members,
        message: openChatRequest.message,
        topic: openChatRequest.topic,
      });
      resolve(sendPromise);
    });
  }
  /**
   * @hidden
   * Hide from docs
   * ------
   * Allows an app to retrieve information of all chat members
   * Because a malicious party run your content in a browser, this value should
   * be used only as a hint as to who the members are and never as proof of membership.
   *
   * @param callback The callback to invoke when the {@link ChatMembersInformation} object is retrieved.
   * @returns Promise resolved with information on all chat members
   *
   * @internal
   */
  export function getChatMembers(): Promise<ChatMembersInformation> {
    return new Promise<ChatMembersInformation>(resolve => {
      ensureInitialized();
      resolve(sendAndUnwrap('getChatMembers'));
    });
  }

  export function isSupported(): boolean {
    return runtime.supports.chat ? true : false;
  }

  export namespace conversation {
    /**
     * @hidden
     * Hide from docs
     * --------------
     * Allows the user to start or continue a conversation with each subentity inside the tab
     *
     * @returns Promise resolved upon completion
     */
    export function openConversation(openConversationRequest: OpenConversationRequest): Promise<void> {
      return new Promise<void>(resolve => {
        ensureInitialized(FrameContexts.content);
        const sendPromise = sendAndHandleError('conversations.openConversation', {
          title: openConversationRequest.title,
          subEntityId: openConversationRequest.subEntityId,
          conversationId: openConversationRequest.conversationId,
          channelId: openConversationRequest.channelId,
          entityId: openConversationRequest.entityId,
        });
        if (openConversationRequest.onStartConversation) {
          registerHandler(
            'startConversation',
            (subEntityId: string, conversationId: string, channelId: string, entityId: string) =>
              openConversationRequest.onStartConversation({
                subEntityId,
                conversationId,
                channelId,
                entityId,
              }),
          );
        }
        if (openConversationRequest.onCloseConversation) {
          registerHandler(
            'closeConversation',
            (subEntityId: string, conversationId?: string, channelId?: string, entityId?: string) =>
              openConversationRequest.onCloseConversation({
                subEntityId,
                conversationId,
                channelId,
                entityId,
              }),
          );
        }
        resolve(sendPromise);
      });
    }

    /**
     * @hidden
     * Hide from docs
     * --------------
     * Allows the user to close the conversation in the right pane
     */
    export function closeConversation(): void {
      ensureInitialized(FrameContexts.content);
      sendMessageToParent('conversations.closeConversation');
      removeHandler('startConversation');
      removeHandler('closeConversation');
    }

    export function isSupported(): boolean {
      return runtime.supports.chat.conversation ? true : false;
    }
  }
}