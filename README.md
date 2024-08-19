# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Install Ruby version 3.3.4
  Install with rvm:
  ```
    $ rvm install "ruby 3.3.4"
    $ rvm use "ruby 3.3.4"
  ```

* Install Postgresql server

* System dependencies
```
  - Backend:
    $ sudo apt-get --assume-yes install gcc libcurl4-openssl-dev libxml2-dev (install Linux: Ubuntu)
    $ sudo apt install libpq-dev -y rails (install Linux: Ubuntu)
    $ gem install bundler (to install package manager "bundler")
    $ bundle install (to install dependencies, can take a while first time)

  - Frontend:
    $ yarn install (to install dependencies)
  ```

* Configuration
  
  Rename the file .copy-env for .env

* Database creation
```
rails db:create
```

* Database initialization
```
rails db:migrate
rails db:seed
```

* How to run the test suite

  * development
    ```
    bin/dev
    ```
