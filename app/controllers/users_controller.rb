class UsersController < ApplicationController

  def edit
    if current_user.edit(user_params)
    redirect_to root_path
    else
      render :edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end