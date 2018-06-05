Rails.application.routes.draw do
  post "/", to: "home#get_params"
  root 'home#index'

end
