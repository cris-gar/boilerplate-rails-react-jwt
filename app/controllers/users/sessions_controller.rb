# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    skip_before_action :authenticate_user_from_token!, only: %i[create destroy]

    respond_to :json

    def validate_token
      if user_signed_in?
        render json: { user: current_user }, status: :ok
      else
        render json: { error: "Invalid token" }, status: :unauthorized
      end
    end

    private

    def respond_with(resource, _opts = {})
      token = current_token
      cookies.signed[:jwt] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?
      }
      render json: { message: "Logged in successfully", user: resource }, status: :ok
    end

    def respond_to_on_destroy
      cookies.delete(:jwt)
      render json: { message: "Logged out successfully" }, status: :ok
    end

    def current_token
      request.env["warden-jwt_auth.token"]
    end
  end
end
