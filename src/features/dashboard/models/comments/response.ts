import type { Meta } from "../articles/state"

export interface GetCommentListResponse {
  data: Comment[]
  meta: Meta
}

export interface GetCommentByIdResponse {
  data: Comment
  meta: Meta
}

export interface CreateCommentResponse extends GetCommentByIdResponse {}
export interface UpdateCommentResponse extends GetCommentByIdResponse {}
