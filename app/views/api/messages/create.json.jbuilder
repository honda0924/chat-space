json.(@message, :body, :image.url)
json.created_at @message.created_at.to_s(:datetime)
json.user_name @message.user.name
json.id @message.id