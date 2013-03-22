/*
 Copyright (C) 2011 MoSync AB

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License,
 version 2, as published by the Free Software Foundation.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 MA 02110-1301, USA.
 */
/**
 * Usage example for the location API.
 * A Moblet that retrieves Location events and prints raw data to the console.
 *
 * WARNING: The location API is experimental, not fully tested. It may not work as advertised.
 * Implementation details are likely to change in the future.
 */

#include <conprint.h>
#include <maassert.h>
#include <MAUtil/Moblet.h>
#include <Wormhole/HybridMoblet.h>
#include <ma.h>
#include <maapi.h>
using namespace MAUtil;
using namespace NativeUI;
using namespace Wormhole;

class MyMoblet: public HybridMoblet {
public:
	MyMoblet() {

		showPage("index.html");
		addMessageFun("Change", (FunTable::MessageHandlerFun) &MyMoblet::orent);
		addMessageFun("Vibrate", (FunTable::MessageHandlerFun) &MyMoblet::vibrate);
	}

	void orent(Wormhole::MessageStream& message) {
		MAUtil::String (url) = MAUtil::String(message.getNext());
		showPage(url);
	}
	void vibrate(Wormhole::MessageStream& message) {
		int duration = MAUtil::stringToInteger(message.getNext());
		maVibrate(duration);
	}

	void MyMoblet::keyPressEvent(int keyCode, int nativeCode)
	{
	  if (MAK_BACK == keyCode)
	  {
	    String url=getWebView()->getURL();
	    url=url.substr(url.length()-10,10);
	    if (url=="index.html")
	    {
	      closeEvent();
	    }
	    else
	    {
	      callJS("history.back()");
	    }
	  }
	}


};
extern "C" int MAMain() {
	(new MyMoblet())->enterEventLoop();
	return 0;
}
