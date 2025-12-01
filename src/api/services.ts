import axiosClient from './axiosClient';
import type {
    LoginCommand,
    RegisterCommand,
    AuthResponse,
    CreateDecisionCommand,
    UpdateDecisionCommand,
    DecisionDto,
    PublicPostDto,
    PaginatedResult
} from '../types';

export const authService = {
  register: async (data: RegisterCommand): Promise<void> => {
    await axiosClient.post('/api/Auth/register', data);
  },

  login: async (data: LoginCommand): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/api/Auth/login', data);
    return response.data;
  }
};

export const decisionService = {
  getAll: async (): Promise<DecisionDto[]> => {
    const response = await axiosClient.get<DecisionDto[]>('/api/Decisions');
    return response.data;
  },

  getById: async (id: number): Promise<DecisionDto> => {
    const response = await axiosClient.get<DecisionDto>(`/api/Decisions/${id}`);
    return response.data;
  },

  create: async (data: CreateDecisionCommand): Promise<void> => {
    await axiosClient.post('/api/Decisions', data);
  },

  update: async (id: number, data: UpdateDecisionCommand): Promise<void> => {
    await axiosClient.put(`/api/Decisions/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/Decisions/${id}`);
  },

  publish: async (id: number): Promise<void> => {
    await axiosClient.post(`/api/Decisions/${id}/publish`);
  }
};

export const publicService = {
  getAll: async (pageNumber: number = 1, pageSize: number = 10): Promise<PaginatedResult<PublicPostDto>> => {
    const response = await axiosClient.get<PaginatedResult<PublicPostDto>>('/api/PublicPosts', {
      params: { 
        PageNumber: pageNumber, 
        PageSize: pageSize 
      }
    });
    return response.data;
  },

  getById: async (id: number): Promise<PublicPostDto> => {
    const response = await axiosClient.get<PublicPostDto>(`/api/PublicPosts/${id}`);
    return response.data;
  },

  upvote: async (id: number): Promise<void> => {
    await axiosClient.post(`/api/PublicPosts/${id}/upvote`);
  }
};
