class HomeController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [ :index, :hello ]
  def index; end

  def hello; end
end
