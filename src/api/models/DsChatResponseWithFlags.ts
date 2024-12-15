/* tslint:disable */
/* eslint-disable */
/**
 * Mailing app
 * my api
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface DsChatResponseWithFlags
 */
export interface DsChatResponseWithFlags {
    /**
     * 
     * @type {number}
     * @memberof DsChatResponseWithFlags
     */
    friends?: number;
    /**
     * 
     * @type {number}
     * @memberof DsChatResponseWithFlags
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DsChatResponseWithFlags
     */
    img?: string;
    /**
     * 
     * @type {string}
     * @memberof DsChatResponseWithFlags
     */
    info?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DsChatResponseWithFlags
     */
    isRead?: boolean;
    /**
     * 
     * @type {string}
     * @memberof DsChatResponseWithFlags
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof DsChatResponseWithFlags
     */
    nickname?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DsChatResponseWithFlags
     */
    sound?: boolean;
    /**
     * 
     * @type {number}
     * @memberof DsChatResponseWithFlags
     */
    subscribers?: number;
}

/**
 * Check if a given object implements the DsChatResponseWithFlags interface.
 */
export function instanceOfDsChatResponseWithFlags(value: object): value is DsChatResponseWithFlags {
    return true;
}

export function DsChatResponseWithFlagsFromJSON(json: any): DsChatResponseWithFlags {
    return DsChatResponseWithFlagsFromJSONTyped(json, false);
}

export function DsChatResponseWithFlagsFromJSONTyped(json: any, ignoreDiscriminator: boolean): DsChatResponseWithFlags {
    if (json == null) {
        return json;
    }
    return {
        
        'friends': json['friends'] == null ? undefined : json['friends'],
        'id': json['id'] == null ? undefined : json['id'],
        'img': json['img'] == null ? undefined : json['img'],
        'info': json['info'] == null ? undefined : json['info'],
        'isRead': json['is_read'] == null ? undefined : json['is_read'],
        'name': json['name'] == null ? undefined : json['name'],
        'nickname': json['nickname'] == null ? undefined : json['nickname'],
        'sound': json['sound'] == null ? undefined : json['sound'],
        'subscribers': json['subscribers'] == null ? undefined : json['subscribers'],
    };
}

export function DsChatResponseWithFlagsToJSON(json: any): DsChatResponseWithFlags {
    return DsChatResponseWithFlagsToJSONTyped(json, false);
}

export function DsChatResponseWithFlagsToJSONTyped(value?: DsChatResponseWithFlags | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'friends': value['friends'],
        'id': value['id'],
        'img': value['img'],
        'info': value['info'],
        'is_read': value['isRead'],
        'name': value['name'],
        'nickname': value['nickname'],
        'sound': value['sound'],
        'subscribers': value['subscribers'],
    };
}

