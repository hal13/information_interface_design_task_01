class HomeController < ApplicationController
  before_action :get_range
  
  def index
    count = 100 unless params[:count]
    @random_values = SetRandom.get_random_values(count)
  end
  
  private
  
  def get_range
    @range_from_to = SetRandom.get_value_from_to
  end
end
