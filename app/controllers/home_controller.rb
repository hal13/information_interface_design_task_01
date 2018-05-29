class HomeController < ApplicationController
  def index
    count = 100 unless params[:count]
    @random_values = SetRandom.get_random_values(count)
  end
end
