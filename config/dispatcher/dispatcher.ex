defmodule Dispatcher do
  use Matcher
  define_accept_types [
    html: [ "text/html", "application/xhtml+html" ],
    json: [ "application/json", "application/vnd.api+json" ]
  ]

  @any %{}
  @json %{ accept: %{ json: true } }
  @html %{ accept: %{ html: true } }

  match "/about/*path", @any do
    Proxy.forward conn, path, "http://resource/about/"
  end

  match "/wiki-race/*path", @json do
    Proxy.forward conn, path, "http://resource/"
  end

  match "/pages/*path", @any do
    Proxy.forward conn, path, "http://wiki-race/"
  end

  match "/accounts/\*path", @json do
    Proxy.forward conn, path, "http://registration/accounts/"
  end

  match "/sessions/\*path", @json do
    Proxy.forward conn, path, "http://login/sessions/"
  end

  match "/*_", %{ last_call: true } do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end
end
