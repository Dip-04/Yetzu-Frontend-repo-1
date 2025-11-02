"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { identityService } from "./identityService";
import Cookies from "js-cookie";
import {
  GetUserProfileResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  SignupPayload,
  SignupResponse,
} from "./types";
import toast from "react-hot-toast";

const useGetUserProfile = (): UseQueryResult<
  GetUserProfileResponse,
  unknown
> => {
  const accessToken = Cookies.get("jwtToken") || "";

  return useQuery<GetUserProfileResponse>({
    queryKey: ["getUserProfile"],
    queryFn: identityService.getUserProfile,
    enabled: !!accessToken,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  unknown,
  LoginPayload
> => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: identityService.login,
    onSuccess: (data) => {
      Cookies.set("jwtToken", data.userData.jwtToken, { expires: 1 });
      Cookies.set("refreshToken", data.userData.refresh_token, { expires: 7 });
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useGoogleLoginMutation = (): UseMutationResult<
  LoginResponse,
  unknown,
  { idToken: string }
> => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, unknown, { idToken: string }>({
    mutationFn: ({ idToken }) => identityService.googleLogin(idToken),
    onSuccess: (data) => {
      Cookies.set("jwtToken", data.userData.jwtToken, { expires: 1 });
      Cookies.set("refreshToken", data.userData.refresh_token, { expires: 7 });
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useLogoutMutation = (): UseMutationResult<
  LogoutResponse,
  unknown,
  { userId: string }
> => {
  const queryClient = useQueryClient();
  return useMutation<LogoutResponse, unknown, { userId: string }>({
    mutationFn: ({ userId }) => identityService.logout(userId),
    onSuccess: () => {
      Cookies.remove("jwtToken");
      Cookies.remove("refreshToken");
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useSignUpMutation = (): UseMutationResult<
  SignupResponse,
  unknown,
  SignupPayload
> => {
  const { mutateAsync: login } = useLoginMutation();
  const queryClient = useQueryClient();
  return useMutation<SignupResponse, unknown, SignupPayload>({
    mutationFn: identityService.signup,
    onSuccess: async (data, variables) => {
      try {
        const res = await login({
          email: variables.email,
          password: variables.password,
        });
      } catch {
        toast.error("Error while logging in!");
      }
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

export {
  useGetUserProfile,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
};
