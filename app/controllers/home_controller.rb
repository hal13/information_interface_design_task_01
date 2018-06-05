class HomeController < ApplicationController
  
  DEFAULT_NUMBER_OF_VALUES = 100
  
  before_action :get_range, only:[:index]
  before_action :get_number_of_values, only:[:index]
  
  def index
    session[:number_of_value] = DEFAULT_NUMBER_OF_VALUES unless session[:number_of_value]
    @number_of_value = session[:number_of_value]
    
    @random_values = SetRandom.get_random_values(@number_of_value)
  end
  
  def get_params
    session[:number_of_value] = params[:number_of_value].to_i

    respond_to do |format|
      format.html { redirect_to root_path }
    end
  end
  
  private
  
  def get_range
    @range_from_to = SetRandom.get_value_from_to
  end
  
  def get_number_of_values
    @select_number_of_values = { "10" => 10, "20" => 20, "50" => 50, "100" => 100, "150" => 150, "200" => 200, "500" => 500}
  end
end
