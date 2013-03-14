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
		addMessageFun("Start", (FunTable::MessageHandlerFun) &MyMoblet::start);
		addMessageFun("Change", (FunTable::MessageHandlerFun) &MyMoblet::orent);
		addMessageFun("Vibrate", (FunTable::MessageHandlerFun) &MyMoblet::vibrate);
	}
	void start(Wormhole::MessageStream& message) {
		int res = maLocationStart();
	}
	void orent(Wormhole::MessageStream& message) {
		MAUtil::String (url) = MAUtil::String(message.getNext());
		showPage(url);
	}
	void vibrate(Wormhole::MessageStream& message) {
		int duration = MAUtil::stringToInteger(message.getNext());
		maVibrate(duration);
	}

	void customEvent(const MAEvent& event) {
		if (event.type == EVENT_TYPE_LOCATION) {
			MALocation& loc = *(MALocation*) event.data;

			if (loc.lon < -180.0 || loc.lon > 180.0 || loc.lat < -90.0
					|| loc.lat > 90.0) {
				printf("invalid lat or lon\n");
			} else {
				printf("%i %.8g %.8g %.4g %.4g %.4g\n", loc.state, loc.lat,
						loc.lon, loc.horzAcc, loc.vertAcc, loc.alt);
				// number to be converted to a string
				String latstr = doubleToString(loc.lat);
				String lonstr = doubleToString(loc.lon);
				char lati[200];
				sprintf(lati, "onSuccess('%f','%f')", loc.lat,
						loc.lon);
				callJS(lati);
				maLocationStart();
			}

		} else if (event.type == EVENT_TYPE_LOCATION_PROVIDER) {
			const char *strings[] = { "AVAILABLE", "TEMPORARILY_UNAVAILABLE",
					"OUT_OF_SERVICE" };

			printf("gps provider: %s\n", strings[event.state - 1]);
			callJS("alert(strings[event.state - 1])");

		} else {
			printf("custom event %i\n", event.type);
			callJS("alert(event.type)");
		}
	}

};
extern "C" int MAMain() {
	(new MyMoblet())->enterEventLoop();
	return 0;
}
