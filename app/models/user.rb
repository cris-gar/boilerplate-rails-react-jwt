class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  # Método para buscar un usuario por su JWT
  def self.find_by_jwt_token(token)
    decoded_token = JWT.decode(token, ENV["DEVISE_JWT_SECRET_KEY"], true).first
    user_id = decoded_token["sub"] # 'sub' es el claim que Devise-JWT usa para el user_id
    find(user_id)
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    nil
  end
end
