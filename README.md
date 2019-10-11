# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :comments
- has_many :groups, through: :group_users


## groupsテーブル
Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|user_id|integer|null: false, foreign_key: true|
## Association
- has_many :group_users
- has_many :users
- has_many :comments

## groups_usersテーブル
|column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
