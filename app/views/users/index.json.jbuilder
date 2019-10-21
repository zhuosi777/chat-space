json.array! @users do |user|
  json.id   user.id
  json.name user.name
  json.data user.created_at.strftime("%Y/%m/%d %H:%M")
end