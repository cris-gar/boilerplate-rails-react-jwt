class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  protect_from_forgery unless: -> { request.format.json? }

  before_action :authenticate_user_from_token!

  private

  def authenticate_user_from_token!
    jwt_token = cookies.signed[:jwt]
    if jwt_token
      user = User.find_by_jwt_token(jwt_token)
      sign_in(user, store: false) if user
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
