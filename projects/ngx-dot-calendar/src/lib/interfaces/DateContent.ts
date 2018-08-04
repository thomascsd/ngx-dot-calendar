/**
 * Behavior of Date Content
 *
 * @export
 */
export interface DateContent {
  day: string;
  hasContent: boolean;
  color?: colorTypes;
}

/**
 *
 *
 * @export
 */
export enum colorTypes {
  red,
  blue,
  green,
  purple,
  brown
}
